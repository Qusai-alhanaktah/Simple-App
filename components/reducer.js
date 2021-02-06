import {  combineReducers } from 'redux';
import { LOGIN, LOGOUT, LOGUP } from './action.js';

const initialStateAuth = {
  loggedIn: false,
  loading: false,
  token: null,
  user: {},
};
export const authReducer = function (state = initialStateAuth, action) {
  switch (action.type) {
  case LOGIN:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  case LOGOUT:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  case LOGUP:
    return {...state, loggedIn: action.payload.loggedIn, loading: action.payload.loading, user: action.payload.user, token: action.payload.token };
  default:
    return state;
  }
};
export default combineReducers({
  authReducer: authReducer,
});
