import { GET_USER, LOGOUT } from '../actionTypes';

export const setUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const logoutUser = (payload) => ({
  type: LOGOUT,
  payload,
});


