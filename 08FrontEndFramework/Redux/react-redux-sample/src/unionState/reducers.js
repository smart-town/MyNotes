import {actions} from './actions';
import {combineReducers} from 'redux';

const initialState = {
    header: 'default header name',
    footer: 'default footer name',
}
function header(state=initialState.header,action){
    switch(action.type){
        case actions.RENAME:
            return action.title;
        default:
            return state;
    }
}
function footer(state=initialState.footer,action){
    switch(action.type){
        case actions.TITLE:
            return action.title;
        default:
            return state;
    }
}

export const myApp = combineReducers({header,footer})