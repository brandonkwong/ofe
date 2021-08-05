import { Action, Routine } from './types';

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const fetchUsersRequest: Action = (payload) => ({
  type: FETCH_USERS_REQUEST,
  payload
});
fetchUsersRequest.toString = () => FETCH_USERS_REQUEST;

const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
const fetchUsersError: Action = (payload) => ({
  type: FETCH_USERS_ERROR,
  payload
});
fetchUsersError.toString = () => FETCH_USERS_ERROR;

const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const fetchUsersSuccess: Action = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload
});
fetchUsersSuccess.toString = () => FETCH_USERS_SUCCESS;

const FETCH_USER_POSTS_REQUEST = 'FETCH_USER_POSTS_REQUEST';
const fetchUserPostsRequest: Action = (payload) => ({
  type: FETCH_USER_POSTS_REQUEST,
  payload
});
fetchUserPostsRequest.toString = () => FETCH_USER_POSTS_REQUEST;

const FETCH_USER_POSTS_ERROR = 'FETCH_USER_POSTS_ERROR';
const fetchUserPostsError: Action = (payload) => ({
  type: FETCH_USER_POSTS_ERROR,
  payload
});
fetchUserPostsError.toString = () => FETCH_USER_POSTS_ERROR;

const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
const fetchUserPostsSuccess: Action = (payload) => ({
  type: FETCH_USER_POSTS_SUCCESS,
  payload
});
fetchUserPostsSuccess.toString = () => FETCH_USER_POSTS_SUCCESS;

const requestUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest());
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(
      response => response.json(),
      error => {
        console.error(error);
        dispatch(fetchUsersError(error))
      }
    )
    .then(json => dispatch(fetchUsersSuccess(json)));
}

const requestUserPosts = (userId: number) => (dispatch) => {
  dispatch(fetchUserPostsRequest());
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(
      response => response.json(),
      error => {
        console.error(error);
        dispatch(fetchUserPostsError(error))
      }
    )
    .then(json => dispatch(fetchUserPostsSuccess(json)));
}

export default {
  users: {
    fetchUsers: {
      trigger: requestUsers,
      request: fetchUsersRequest,
      error: fetchUsersError,
      success: fetchUsersSuccess
    },
    fetchUserPosts: {
      trigger: requestUserPosts,
      request: fetchUserPostsRequest,
      error: fetchUserPostsError,
      success: fetchUserPostsSuccess
    }
  }
};
