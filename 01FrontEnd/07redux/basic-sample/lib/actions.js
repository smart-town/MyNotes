"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = addTodo;
exports.toggleTodo = toggleTodo;
exports.setVisibilityFilters = setVisibilityFilters;
exports.selectSubreddit = selectSubreddit;
exports.invalidateSubreddit = invalidateSubreddit;
exports.requestPosts = requestPosts;
exports.receivePosts = receivePosts;
exports.fetchPosts = fetchPosts;
exports.RECEIVE_POSTS = exports.REQUEST_POSTS = exports.INVALIDATE_SUBREDDIT = exports.SELECT_SUBREDDIT = exports.VisibilityFilters = exports.SET_VISIBILITY_FILTER = exports.TOGGLE_TODO = exports.ADD_TODO = void 0;

var _crossFetch = require("cross-fetch");

var ADD_TODO = "ADD_TODO";
exports.ADD_TODO = ADD_TODO;
var TOGGLE_TODO = "TOGGLE_TODO";
exports.TOGGLE_TODO = TOGGLE_TODO;
var SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
exports.SET_VISIBILITY_FILTER = SET_VISIBILITY_FILTER;
var VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED'
};
exports.VisibilityFilters = VisibilityFilters;

function addTodo(text) {
  return {
    type: ADD_TODO,
    text: text
  };
}

function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    index: index
  };
}

function setVisibilityFilters(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter: filter
  };
} //异步。。。。。


var SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
exports.SELECT_SUBREDDIT = SELECT_SUBREDDIT;
var INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
exports.INVALIDATE_SUBREDDIT = INVALIDATE_SUBREDDIT;
var REQUEST_POSTS = 'REQUEST_POSTS';
exports.REQUEST_POSTS = REQUEST_POSTS;

function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit: subreddit
  };
}

function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit: subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit: subreddit
  };
}

var RECEIVE_POSTS = "RECEIVE_POSTS";
exports.RECEIVE_POSTS = RECEIVE_POSTS;

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit: subreddit,
    posts: JSON.stringify(json),
    receivedAt: Date.now()
  };
}

function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit));
    return (0, _crossFetch.fetch)('http://localhost:3000/posts/1').then(function (response) {
      return response.json();
    }, function (error) {
      return console.log("An error occurred.", error);
    }).then(function (json) {
      return dispatch(receivePosts(subreddit, json));
    });
  };
}