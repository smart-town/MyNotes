"use strict";

var _reducers = _interopRequireDefault(require("./reducers"));

var _actions = require("./actions");

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _redux.createStore)(_reducers["default"]); //包装

function logDispatch(action) {
  console.log("[MiddlewareTest] prev state " + JSON.stringify(store.getState()));
  console.log("[MiddlewareTest] action " + JSON.stringify(action));
  store.dispatch(action);
  console.log("[MiddlewareTest] now state" + JSON.stringify(store.getState()));
  console.log("-------------------------------");
} // logDispatch(addTodo("Success!"));
//封装


function dispatchAndLog(store, action) {
  console.log("[Action]:", action);
  store.dispatch(action);
  console.log("[NextState]", store.getState());
} // dispatchAndLog(store,selectSubreddit("ok"))
//直接替换 store 中的 dispatch

/* const next = store.dispatch ;
store.dispatch = function dispatchAndLog(action){
    console.log("-------------------------------")
    console.log('dispatching',action);
    let result = next(action);
    console.log('next state ',store.getState());
    return result;
}

store.dispatch(toggleTodo("Success!")) */
// 当需要给 dispatch 附加多种模块时，如果以替换 dispatch 的方式进行

/* function patchStoreToLog(store){
    const next = store.dispatch;
    store.dispatch=function log(action){
        console.log("[patchlog]dipatching",action);
        let result = next(action);
        console.log("[patchlog]next state",store.getState());
        return result;
    }
}
function patchStoreToCatch(store){
    const next = store.dispatch;
    store.dispatch = function reportError(action){
        try{
            return next(action);
        }catch(err){
            console.log('[reportError]catch error:',err);
            throw err;
        }
    }
}
patchStoreToCatch(store);
patchStoreToLog(store);
store.dispatch(addTodo("to be awesome")) */
//以上是“将任意方法替换为你想要的”。


function logger(store) {
  var next = store.dispatch;
  return function dispatchLog(action) {
    console.log('[release]dispatching..', action);
    var result = next(action);
    console.log('[release]next state...', store.getState());
    return result;
  };
}

function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();
  middlewares.forEach(function (middleware) {
    return store.dispatch = middleware(store);
  });
}
/*应用middleware*/


applyMiddleware(store, [logger]);
console.log("===============================");
store.dispatch((0, _actions.addTodo)("You should have a goal"));