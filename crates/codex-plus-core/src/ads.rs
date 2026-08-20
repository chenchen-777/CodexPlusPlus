use serde_json::{Value, json};

pub fn normalize_ad_payload(_payload: Value) -> Value {
    json!({ "version": 1, "ads": [] })
}

pub async fn fetch_ad_list() -> anyhow::Result<Value> {
    Ok(normalize_ad_payload(Value::Null))
}

pub async fn fetch_ad_list_from_urls<S>(_urls: &[S]) -> anyhow::Result<Value>
where
    S: AsRef<str>,
{
    Ok(normalize_ad_payload(Value::Null))
}
