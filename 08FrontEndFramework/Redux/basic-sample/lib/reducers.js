"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _actions = require("./actions");

var _utils = require("./utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SHOW_ALL = _actions.VisibilityFilters.SHOW_ALL;
var logger = new _utils.Logger("REDUCER", true);

function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SHOW_ALL;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  logger.log("visibilityFilter-reducer:", action);

  switch (action.type) {
    case _actions.SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      logger.log("visibilityFilter default...", action);
      return state;
  }
}

function todos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  logger.log("todos-reducer:", action);

  switch (action.type) {
    case _actions.ADD_TODO:
      return [].concat(_toConsumableArray(state), [{
        text: action.text,
        completed: false
      }]);

    case _actions.TOGGLE_TODO:
      return state.map(function (todo, index) {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }

        return todo;
      });

    default:
      logger.log("todos-reducer default...", action);
      return state;
  }
}

function selectedsubreddit() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'reactjs';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.SELECT_SUBREDDIT:
      return action.subreddit;

    default:
      return state;
  }
}

function posts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: false,
    didInvalidate: false,
    items: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });

    case _actions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case _actions.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
  }
}

function postsBySubreddit() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.INVALIDATE_SUBREDDIT:
    case _actions.RECEIVE_POSTS:
    case _actions.REQUEST_POSTS:
      return Object.assign({}, state, _defineProperty({}, action.subreddit, posts(state[action.subreddit], action)));

    default:
      return state;
  }
}

var todoApp = (0, _redux.combineReducers)({
  visibilityFilter: visibilityFilter,
  todos: todos // postsBySubreddit,
  // selectedsubreddit,

});
var _default = todoApp;
exports["default"] = _default;