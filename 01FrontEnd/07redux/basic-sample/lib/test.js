"use strict";

var _store = require("./store");

var _actions = require("./actions");

console.log(_store.store.getState());

var unsubscribe = _store.store.subscribe(function () {
  return console.log(_store.store.getState());
});

_store.store.dispatch((0, _actions.addTodo)("cherry"));

_store.store.dispatch((0, _actions.addTodo)("cherry2"));

_store.store.dispatch((0, _actions.toggleTodo)(1));

unsubscribe();