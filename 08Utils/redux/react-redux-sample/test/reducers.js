"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myApp = void 0;

var _actions = require("./actions");

var _redux = require("redux");

var initialState = {
  header: 'default header name'
};

function header() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState.header;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.actions.RENAME:
      return action.title;

    default:
      return state;
  }
}

var myApp = (0, _redux.combineReducers)({
  header: header
});
exports.myApp = myApp;