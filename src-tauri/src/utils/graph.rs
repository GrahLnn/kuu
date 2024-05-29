use crate::database::db;

pub async fn link_node_to_file(node_title: String, file_hash: String) -> () {
    let sql = r#"
        LET $file = (SELECT VALUE id FROM file WHERE hash = $hash);
        LET $node = (SELECT VALUE id FROM node WHERE title = $title);
        UPDATE $node SET linked_files += SELECT VALUE path FROM ONLY $file LIMIT 1;
        RELATE $node -> linked -> $file;
        LET $labels = array::union(SELECT VALUE labels FROM ONLY $file LIMIT 1, SELECT VALUE labels FROM ONLY $node LIMIT 1);
        UPDATE $node SET labels = $labels;
        "#;
    let params = Some(vec![
        ("hash", file_hash.as_str()),
        ("title", node_title.as_str()),
    ]);
    db::execute(sql, params).await;
}

pub async fn link_node_to_label(node_title: String, label_title: String) -> () {
    let sql = r#"
        LET $label = (SELECT VALUE id FROM ONLY label WHERE title = $label_title LIMIT 1);
        LET $node = (SELECT VALUE id FROM ONLY node WHERE title = $node_title LIMIT 1);
        LET $labeled = (SELECT VALUE ->labeled.out FROM ONLY $node LIMIT 1);

        DEFINE FUNCTION fn::update_link($nodeID: record, $labelID: record) {
            RELATE $nodeID -> labeled -> $labelID;
            UPDATE $nodeID SET labels += (SELECT VALUE title FROM ONLY $labelID);
        };

        IF $label NOTINSIDE $labeled THEN
            fn::update_link($node, $label)
        END;
        "#;
    let params = Some(vec![
        ("label_title", label_title.as_str()),
        ("node_title", node_title.as_str()),
    ]);
    db::execute(sql, params).await;
}

pub async fn delete_node_label_link(node_title: String, label_title: String) -> () {
    let sql = r#"
        LET $label = (SELECT VALUE id FROM ONLY label WHERE title = $label_title LIMIT 1);
        LET $node = (SELECT VALUE id FROM ONLY node WHERE title = $node_title LIMIT 1);
        LET $labeled = (SELECT VALUE ->labeled.out FROM ONLY $node LIMIT 1);

        DEFINE FUNCTION fn::delete_link($nodeID: record, $labelID: record) {
            DELETE $nodeID->labeled WHERE out == $labelID;
            UPDATE $nodeID SET labels -= (SELECT VALUE title FROM ONLY $labelID);
        };

        IF $label INSIDE $labeled THEN
            fn::delete_link($node, $label)
        END;
        "#;
    let params = Some(vec![
        ("label_title", label_title.as_str()),
        ("node_title", node_title.as_str()),
    ]);
    db::execute(sql, params).await;
}

pub async fn delete_file_and_update_network(path: String) -> () {
    let sql = r#"
        LET $file = (SELECT VALUE id FROM ONLY file WHERE path = $path LIMIT 1);
        LET $nodes = array::distinct(SELECT VALUE <-linked.in FROM ONLY $file);
        DELETE $file;
        FOR $node IN $nodes {
            
            LET $fs = SELECT VALUE ->linked.out FROM ONLY $node;
            LET $lbs = array::group(SELECT VALUE labels FROM $fs);
            UPDATE $node SET linked_files -= $path, labels = $lbs;
        };
        FOR $node IN $nodes {
            LET $files = SELECT VALUE ->linked.out FROM ONLY $node;
            LET $paths = SELECT VALUE path FROM $files;
            IF $paths == [] THEN
                DELETE $node
            END;
        };
        LET $b = SELECT VALUE ->linked.out FROM ONLY $nodes LIMIT 1;
        array::union(SELECT VALUE labels FROM $b);
    "#;
    let params = Some(vec![("path", path.as_str())]);
    db::execute(sql, params).await;
}
