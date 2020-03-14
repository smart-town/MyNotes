import {createStore} from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo } from './actions';
let store = createStore(todoApp)
console.log(store.getState());
store.dispatch(addTodo("Learn about redux"))
console.log(store.getState());
store.dispatch(toggleTodo(0))
console.log(store.getState());
