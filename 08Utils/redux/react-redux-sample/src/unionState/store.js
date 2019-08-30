import {createStore} from 'redux';
import {myApp} from './reducers';
let store = createStore(myApp) ;

console.log(store.getState());

/* let un = store.subscribe(()=>{
    console.log(store.getState());
}) */
export default store;
/* 
store.dispatch(actions.setHeader("test1"))

un(); */