import { createStore } from 'redux'
import todoApp from './reducers'

export let store = createStore(todoApp)

