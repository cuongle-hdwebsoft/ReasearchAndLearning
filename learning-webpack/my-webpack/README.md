// Plugins run before Presets.
// Plugin ordering is first to last.
// Preset ordering is reversed (last to first).


## Babel-loader

This package allows transpiling JavaScript files using Babel and webpack.

[Documentation](https://babeljs.io/docs/en/babel-preset-env)

Config: Need make a file babel.config.json to config.

### @babel/preset-env preset

is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

It will read config babel.config.json above

When no targets are specified: Babel will assume you are targeting the oldest browsers possible. For example, @babel/preset-env will transform all ES2015-ES2020 code to be ES5 compatible.

[Documentation](https://babeljs.io/docs/en/babel-preset-env)

## ES6

ECMAScript 2015 is also known as ES6 and ECMAScript 6.

## css-loader

The css-loader interprets @import and url() like import/require() and will resolve them.

Example: @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

## style-loader

Inject CSS into the DOM.

