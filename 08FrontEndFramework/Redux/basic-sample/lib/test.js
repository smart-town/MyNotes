"use strict";

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _actions = require("./actions");

var _middlewaretest = require("./middlewaretest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _redux.createStore)(_reducers["default"]);
console.log(store.getState());
store.dispatch((0, _actions.addTodo)("Learn about redux"));
console.log(store.getState());
store.dispatch((0, _actions.toggleTodo)(0));
console.log(store.getState());
console.log("==============test-about-replace-dispatch============");
var initialDispatch = store.dispatch;

store.dispatch = function (action) {
  console.log("\naction begin:", action, "InitialState:", store.getState());
  initialDispatch(action);
  console.log("action end:", action, "EndState:", store.getState());
};

store.dispatch((0, _actions.addTodo)("I want you..."));
store.dispatch((0, _actions.addTodo)("Be excellect."));
store.dispatch = initialDispatch;
console.log("=============test-mylog-middleware==============");
var storeAdvanced = (0, _redux.createStore)(_reducers["default"], (0, _redux.applyMiddleware)(_middlewaretest.logMiddleware, _middlewaretest.timeoutScheduler));
storeAdvanced.dispatch((0, _actions.addTodo)("Belive you!"));
storeAdvanced.dispatch((0, _actions.addTodo)("Execrise you!"));