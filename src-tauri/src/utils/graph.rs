use crate::database::db;

use super::{common, file::FileRecord, label::LabelRecord, node::NodeRecord};

pub async fn link_node_to_file(node: NodeRecord, file: FileRecord) -> () {
    let sql = r#"
        LET $file = <record>$hashID;
        LET $node = <record>$nodeID;
        UPDATE $node SET linked_files += $path;
        RELATE $node -> linked -> $file;
        LET $labels = array::union($file_labels, $node_labels);
        UPDATE $node SET labels = $labels;
        "#;
    let file_id = format!("file:{}", file.hash);
    let node_id = format!("node:{}", node.hash);
    // let file_labels_json = serde_json::to_string(&file.labels).unwrap();
    let params1 = Some(vec![
        ("hashID", file_id.as_str()),
        ("nodeID", node_id.as_str()),
        ("path", file.path.as_str()),
    ]);
    let params2 = Some(vec![
        ("file_labels", file.labels),
        ("node_labels", node.labels),
    ]);

    let _ = db::query(sql, params1, params2).await;
}

pub async fn link_node_to_label(node: NodeRecord, labels: Vec<LabelRecord>) -> () {
    // let sql = r#"
    //     LET $labels = <array<record>>$labelsID;
    //     LET $node = <record>$nodeID;
    //     LET $labeled = (SELECT VALUE ->labeled.out FROM ONLY $node);

    //     DEFINE FUNCTION fn::update_link($nodeID: record, $labelID: record) {
    //         RELATE $nodeID -> labeled -> $labelID;
    //         UPDATE $nodeID SET labels += (SELECT VALUE title FROM ONLY $labelID);
    //     };
    //     FOR $label IN array::difference($labels, $labeled) {
    //         fn::update_link($node, $label)
    //     }
    // "#;
    // let node_id = format!("node:{}", node.hash);
    // let mut labels_id = Vec::new();
    // for label in labels {
    //     labels_id.push(format!("label:{}", label.hash));
    // }
    // let params = Some(vec![("nodeID", node_id.as_str())]);
    // let params2 = Some(vec![("labelsID", labels_id)]);
    // let _ = db::query(sql, params, params2).await;

    let sql = r#"LET $labeled = (SELECT VALUE ->labeled.out FROM ONLY <record>$node);
    SELECT * FROM $labeled;
    "#;
    let node_id = format!("node:{}", node.hash);
    let params = Some(vec![("node", node_id.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>)
        .await
        .map_err(|e| e.to_string())
        .unwrap();
    let labeled: Vec<LabelRecord> = res.take(1).unwrap();
    let mut fileter_labels: Vec<LabelRecord> = labels;
    common::remove_duplicates(&mut fileter_labels, &labeled);
    let sql = r#"
        LET $labels = <array<record>>$labelsID;
        LET $node = <record>$nodeID;

        DEFINE FUNCTION fn::update_link($nodeID: record, $labelID: record) {
            RELATE $nodeID -> labeled -> $labelID;
            UPDATE $nodeID SET labels += (SELECT VALUE title FROM ONLY $labelID);
        };
        FOR $label IN $labels {
            fn::update_link($node, $label)
        }
    "#;
    let node_id = format!("node:{}", node.hash);
    let mut labels_id = Vec::new();
    for label in fileter_labels {
        labels_id.push(format!("label:{}", label.hash));
    }
    let params = Some(vec![("nodeID", node_id.as_str())]);
    let params2 = Some(vec![("labelsID", labels_id)]);
    let _ = db::query(sql, params, params2).await;
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
