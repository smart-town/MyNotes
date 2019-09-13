"use strict";

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = require("redux-logger");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//export let store = createStore(todoApp)
//异步测试
var loggerMiddleware = (0, _reduxLogger.createLogger)();
var store = (0, _redux.createStore)(_reducers["default"], (0, _redux.applyMiddleware)(_reduxThunk["default"], loggerMiddleware));
store.dispatch((0, _actions.selectSubreddit)('testSubreddit'));
store.dispatch((0, _actions.fetchPosts)('testjune'));