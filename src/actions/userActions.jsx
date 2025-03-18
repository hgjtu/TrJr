export const TOGGLE_AUTH = 'TOGGLE_AUTH';
export const SET_USER = 'SET_USER';

export const toggleAuth = () => ({
  type: TOGGLE_AUTH,
  payload: isAuth,
});

export const setUser = () => ({
    type: SET_USER,
    payload: {
        username: "username",
        id: 1
    },
});