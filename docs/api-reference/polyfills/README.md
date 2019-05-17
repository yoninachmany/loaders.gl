# Polyfills

Older browsers (mainly Edge and IE11) as well as versions of Node.js prior to v11 do not provide certain classes that loaders.gl depends on.

While there are many good polyfill modules available on `npm`, to make the search for a version that works perfectly with loaders.gl a little easier, a polyfill module is included.

## Usage

Just import `@loaders.gl/polyfills` before you start using other loaders.gl modules.

```js
import '@loaders.gl/polyfills';
import '@loaders.gl/core';
```

## Included Polyfills

| Polyfill  | Node   | Browser  | Comments |
| ---       | ---       | ---      |
| `TextEncoder`/`TextDecoder` | Node.js < 11 | Yes (Older browsers) | Only UTF8 is guaranteed to be supported |
| `atob`/`btoa` | All versions | No | Note: these functions are [not unicode safe](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem), but OK to use for test cases. |
| `fetch` | All versions | No | A subset of the fetch API is supported, see below. |

## fetch Polyfilled API

The Node.js `fetch` polyfill supports a subset of the browser fetch API, including:
- `Response.text()`, `Response.arrayBuffer()`.
- `Response.body` stream
- limited support for `headers`
- data uri / base64 decoding

## Remarks

Note: Applications should only install this module if they need to run under older environments. While the polyfills are only installed at runtime if the platform does not already support them, importing this module will increase the application's bundle size.