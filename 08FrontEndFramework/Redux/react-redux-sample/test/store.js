"use strict";

var _redux = require("redux");

var _reducers = require("./reducers");

var actions = _interopRequireWildcard(require("./actions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var store = (0, _redux.createStore)(_reducers.myApp);
console.log(store.getState());
var un = store.subscribe(function () {
  console.log(store.getState());
});
store.dispatch(actions.setHeader("test1"));
un();