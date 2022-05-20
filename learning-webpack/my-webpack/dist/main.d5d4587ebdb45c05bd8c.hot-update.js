"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemy_webpack"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar _utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nvar arr = Array.from({\n  length: 10\n}).map(function (_, index) {\n  return index;\n});\nconsole.log('Server open port ' + (0, _utils.getPort)());\n\n//# sourceURL=webpack://my-webpack/./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.clearLocalStorage = clearLocalStorage;\nexports.getCurrentLocation = getCurrentLocation;\nexports.getLocalStorage = getLocalStorage;\nexports.getPort = getPort;\nexports.setLocalStorage = setLocalStorage;\n\nfunction getCurrentLocation() {\n  return window.location;\n}\n\nfunction getPort() {\n  return window.location.port;\n}\n\nfunction setLocalStorage(key, value) {\n  localStorage.setItem(key, value);\n}\n\nfunction getLocalStorage(key) {\n  localStorage.getItem(key);\n}\n\nfunction clearLocalStorage() {\n  localStorage.clear();\n}\n\n//# sourceURL=webpack://my-webpack/./src/utils.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6e649a014732b266521f")
/******/ })();
/******/ 
/******/ }
);