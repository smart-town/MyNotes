import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo } from './actions';
import { logMiddleware, timeoutScheduler } from './middlewaretest';
let store = createStore(todoApp)
console.log(store.getState());
store.dispatch(addTodo("Learn about redux"))
console.log(store.getState());
store.dispatch(toggleTodo(0))
console.log(store.getState());

console.log("==============test-about-replace-dispatch============")
const initialDispatch = store.dispatch;
store.dispatch = (action) => {
    console.log("\naction begin:", action, "InitialState:", store.getState());
    initialDispatch(action);
    console.log("action end:", action, "EndState:", store.getState())
}
store.dispatch(addTodo("I want you..."))
store.dispatch(addTodo("Be excellect."))
store.dispatch = initialDispatch; 


console.log("=============test-mylog-middleware==============")
let storeAdvanced = createStore(todoApp, applyMiddleware(logMiddleware, timeoutScheduler))
storeAdvanced.dispatch(addTodo("Belive you!"))
storeAdvanced.dispatch(addTodo("Execrise you!"))