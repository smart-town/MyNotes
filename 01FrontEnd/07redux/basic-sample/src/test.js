import { store } from './store';
import {addTodo,toggleTodo} from './actions';

console.log(store.getState());

const unsubscribe = store.subscribe(()=>console.log(store.getState()))

store.dispatch(addTodo("cherry"));
store.dispatch(addTodo("cherry2"));
store.dispatch(toggleTodo(1));

unsubscribe();