webpackHotUpdate("main",{

/***/ "./src/components/user/MainLogin.js":
/*!******************************************!*\
  !*** ./src/components/user/MainLogin.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserLogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserLogin */ "./src/components/user/UserLogin.js");
/* harmony import */ var _UserCreate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserCreate */ "./src/components/user/UserCreate.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api */ "./src/api/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./src/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/colin/Flatiron/projects/nftgram.io/nftgram/src/components/user/MainLogin.js",
    _s = __webpack_require__.$Refresh$.signature();







 // import { useSelector } from "react-redux";




const MainLogin = props => {
  _s();

  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["useDispatch"])();
  const [loginPage, setLoginPage] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);

  const changePage = bool => {
    setLoginPage(bool);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (_api__WEBPACK_IMPORTED_MODULE_4__["TOKEN"] && _api__WEBPACK_IMPORTED_MODULE_4__["TOKEN"] !== "undefined") dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["getUser"])(_api__WEBPACK_IMPORTED_MODULE_4__["HEADERS"], _api__WEBPACK_IMPORTED_MODULE_4__["TOKEN"])).then(props.history.push("/"));
  });
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
      id: "main-dividing-cont",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
        id: "dividing-cont-L",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("h3", {
          children: "Login"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
        id: "dividing-cont-r",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("h3", {
          children: "Sign"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 9
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 6
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
      className: "ui middle aligned center aligned grid",
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])("div", {
        id: "login-column",
        className: "column",
        children: loginPage ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_UserLogin__WEBPACK_IMPORTED_MODULE_1__["default"], {
          loginPage: loginPage
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 13
        }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(_UserCreate__WEBPACK_IMPORTED_MODULE_2__["default"], {
          loginPage: loginPage
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

_s(MainLogin, "E0JowCRzWxdRWw4QwYK0PZRDszw=", false, function () {
  return [react_redux__WEBPACK_IMPORTED_MODULE_6__["useDispatch"]];
});

_c = MainLogin;
/* harmony default export */ __webpack_exports__["default"] = (MainLogin);

var _c;

__webpack_require__.$Refresh$.register(_c, "MainLogin");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.5c802929a1faaea0a24a.hot-update.js.map