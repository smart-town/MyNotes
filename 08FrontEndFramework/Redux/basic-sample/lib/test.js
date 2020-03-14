"use strict";

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _redux.createStore)(_reducers["default"]);
console.log(store.getState());
store.dispatch((0, _actions.addTodo)("Learn about redux"));
console.log(store.getState());
store.dispatch((0, _actions.toggleTodo)(0));
console.log(store.getState());