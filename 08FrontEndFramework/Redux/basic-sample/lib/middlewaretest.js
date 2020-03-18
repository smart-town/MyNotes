"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutScheduler = exports.logMiddleware = void 0;

var logMiddleware = function logMiddleware(store) {
  return function (next) {
    return function (action) {
      console.group(action.type);
      console.info('dispatching...', action);
      var result = next(action);
      console.log('next state...', store.getState());
      console.groupEnd(action.type);
      return result;
    };
  };
};

exports.logMiddleware = logMiddleware;

var timeoutScheduler = function timeoutScheduler(store) {
  return function (next) {
    return function (action) {
      console.log("fake timeoutScheduler...");
      return next(action);
    };
  };
};

exports.timeoutScheduler = timeoutScheduler;