import {fetch} from 'cross-fetch';
export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
}

export function addTodo(text){
    return {type: ADD_TODO, text};
}

export function toggleTodo(index){
    return {type: TOGGLE_TODO, index};
}

export function setVisibilityFilters(filter){
    return {type: SET_VISIBILITY_FILTER, filter};
}

//异步。。。。。
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const REQUEST_POSTS = 'REQUEST_POSTS';

export function selectSubreddit(subreddit){
    return {
        type: SELECT_SUBREDDIT,
        subreddit,
    }
}
export function invalidateSubreddit(subreddit){
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit,
    }
}
export function requestPosts(subreddit){
    return {
        type: REQUEST_POSTS,
        subreddit,
    }
}

export const RECEIVE_POSTS="RECEIVE_POSTS";
export function receivePosts(subreddit,json){
    return {
        type:RECEIVE_POSTS,
        subreddit,
        posts: JSON.stringify(json),
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit){
    return function(dispatch){
        dispatch(requestPosts(subreddit));

        return fetch('http://localhost:3000/posts/1')
            .then(
                response=>response.json(),
                error=>console.log("An error occurred.",error)
            )
            .then(
                json=>dispatch(receivePosts(subreddit,json))
            )
    }
}