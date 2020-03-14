"use strict";

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = require("redux-logger");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//export let store = createStore(todoApp)
//异步测试
// const loggerMiddleware = createLogger();
var store = (0, _redux.createStore)(_reducers["default"] // applyMiddleware(
//     thunkMiddleware,
//     loggerMiddleware,
// )
); // store.dispatch(selectSubreddit('testSubreddit'))
// store.dispatch(fetchPosts('testjune'))