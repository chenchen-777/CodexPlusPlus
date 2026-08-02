use codex_plus_core::ads::{fetch_ad_list, fetch_ad_list_from_urls, normalize_ad_payload};
use serde_json::json;

#[test]
fn promotional_payloads_are_discarded() {
    let payload = normalize_ad_payload(json!({
        "version": 9,
        "ads": [{
            "type": "sponsor",
            "title": "External service",
            "description": "Promotion",
            "url": "https://example.test"
        }]
    }));

    assert_eq!(payload, json!({ "version": 1, "ads": [] }));
}

#[tokio::test]
async fn ad_loading_never_contacts_remote_sources() {
    let direct = fetch_ad_list().await.unwrap();
    let supplied = fetch_ad_list_from_urls(&["https://example.test/ads.json"])
        .await
        .unwrap();

    assert_eq!(direct, json!({ "version": 1, "ads": [] }));
    assert_eq!(supplied, direct);
}
