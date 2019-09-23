import { createStore,applyMiddleware } from 'redux'
import todoApp from './reducers'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {selectSubreddit,fetchPosts} from './actions'

//export let store = createStore(todoApp)

//异步测试
const loggerMiddleware = createLogger();
const store=createStore(
    todoApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
)

store.dispatch(selectSubreddit('testSubreddit'))
store.dispatch(fetchPosts('testjune'))