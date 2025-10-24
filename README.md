# 🔢 num-format-js

[![npm version](https://img.shields.io/npm/v/@end-y/num-format-js.svg)](https://www.npmjs.com/package/@end-y/num-format-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> WebAssembly bindings for [num-format](https://github.com/bcmyers/num-format) - Blazingly fast number formatting with locale support for JavaScript/TypeScript 🚀

## ✨ Features

- 🌍 **Locale Support** - Format numbers according to different locales (en, tr, de, fr, etc.)
- ⚡ **High Performance** - Powered by Rust and WebAssembly
- 🎨 **Custom Formatting** - Full control over separators, decimal points, and signs
- 📦 **Tiny Bundle Size** - Optimized WASM binary (~93KB)
- 🔧 **Flexible API** - Simple for basic use, powerful for advanced cases
- 💪 **Type Safe** - Full TypeScript support

## 📦 Installation

```bash
npm install @end-y/num-format-js

## 🚀 Quick Start
```

```typescript
import { formatString } from "@end-y/num-format-js";

const result = formatString("tr", 123333666);
console.log(result); // "123,333,666"
```

## 📝 API

### formatString(locale: string, number: number): string

Format a number according to the specified locale.

### getLocaleSettings(locale: string): object

Get the locale settings for the specified locale.

### formatWithCustomLocale(number: number, customSettings: object): string

Format a number according to the specified custom settings.

## 📝 Custom Settings

```typescript
interface CustomSettings {
  grouping: number;
  decimal: string;
  separator: string;
  minusSign: string;
  plusSign: string;
}
```

## 🙏 Acknowledgments

- [num-format](https://github.com/bcmyers/num-format) - The original library that powers this binding.
- [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) - The library that powers this binding.

## 📜 License

MIT
