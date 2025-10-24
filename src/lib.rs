use wasm_bindgen::prelude::*;
use js_sys::Reflect;
use num_format::{Buffer, CustomFormat, Grouping, Locale, ToFormattedString};

#[wasm_bindgen(start)]
pub fn main() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn format_string(locale: &str, number: isize) -> String {
    match Locale::from_name(locale) {
        Ok(locale) => number.to_formatted_string(&locale),
        Err(_) => {
            // Fallback to 'en' locale if the requested locale is not found
            let fallback = Locale::en;
            number.to_formatted_string(&fallback)
        }
    }
}

#[wasm_bindgen]
pub fn get_locale_settings(locale: &str) -> JsValue {
    let locale = match Locale::from_name(locale) {
        Ok(loc) => loc,
        Err(_) => Locale::en, // Fallback to 'en'
    };
    let grouping = get_grouping_from_grouping_name(locale.grouping());
    let wasm_bindgen_value = JsValue::from(format!("{{\"grouping\": {}, \"decimal\": \"{}\", \"separator\": \"{}\", \"minus_sign\": \"{}\", \"plus_sign\": \"{}\"}}", grouping, locale.decimal(), locale.separator(), locale.minus_sign(), locale.plus_sign()));
    return wasm_bindgen_value;
}
#[wasm_bindgen]
pub fn format_with_custom_locale(number: isize, custom_settings: &JsValue) -> String {
    let grouping = Reflect::get(custom_settings, &"grouping".into()).ok().and_then(|v| v.as_f64()).and_then(|v| Some(v as u8)).unwrap_or(0);
    let minus_sign = Reflect::get(custom_settings, &"minus_sign".into()).ok().and_then(|v| v.as_string()).unwrap_or("-".to_string());
    let plus_sign = Reflect::get(custom_settings, &"plus_sign".into()).ok().and_then(|v| v.as_string()).unwrap_or("+".to_string());
    let decimal = Reflect::get(custom_settings, &"decimal".into()).ok().and_then(|v| v.as_string()).unwrap_or(".".to_string());
    let separator = Reflect::get(custom_settings, &"separator".into()).ok().and_then(|v| v.as_string()).unwrap_or(",".to_string());
    let format = CustomFormat::builder().grouping(get_grouping_from_u8(grouping)).decimal(decimal.as_str()).minus_sign(minus_sign).plus_sign(plus_sign).separator(separator).build();
    let mut buf = Buffer::new();
    match format {
        Ok(format) => {
            buf.write_formatted(&number, &format);
            return buf.to_string();
        },
        Err(e) => {
            return e.to_string();
        }
    }
}

fn get_grouping_from_u8(grouping: u8) -> Grouping {
    match grouping {
        0 => Grouping::Standard,
        1 => Grouping::Indian,
        2 => Grouping::Posix,
        _ => Grouping::Standard,
    }
}
fn get_grouping_from_grouping_name(grouping: Grouping) -> u8 {
    match grouping {
        Grouping::Standard => 0,
        Grouping::Indian => 1,
        Grouping::Posix => 2,
    }
}

    