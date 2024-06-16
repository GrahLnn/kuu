use regex::Regex;
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;
use std::collections::HashSet;
use std::hash::Hash;

pub fn remove_duplicates<T: Eq + Hash>(a: &mut Vec<T>, b: &Vec<T>) {
    let set_b: HashSet<_> = b.iter().collect();
    a.retain(|x| !set_b.contains(x));
}

pub fn generate_random_string(length: usize) -> String {
    let mut rng = thread_rng();
    // 生成一个包含字母和数字的随机字符串
    (0..length)
        .map(|_| rng.sample(Alphanumeric))
        .map(char::from)
        .collect()
}

pub fn remove_special_chars(input: &str) -> String {
    // 定义正则表达式，匹配所有非字母数字和非下划线字符
    let re = Regex::new(r"[^a-zA-Z0-9_]").unwrap();
    // 使用正则表达式替换匹配到的字符为空字符串
    re.replace_all(input, "").to_string()
}

pub fn vec_to_str(vec: Vec<String>) -> String {
    let joined = vec.iter().map(|s| format!("\"{}\"", s)).collect::<Vec<String>>().join(", ");
    format!("[{}]", joined)
}