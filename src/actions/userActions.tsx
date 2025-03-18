import { IUser } from "../models/IUser";
import { SetAuthAction, SetUserAction, SET_AUTH, SET_USER } from "./types/AuthActionTypes";

export const setAuth = (isAuth: boolean): SetAuthAction => ({
  type: SET_AUTH,
  payload: isAuth,
});

export const setUser = (user: IUser | null): SetUserAction => ({
  type: SET_USER,
  payload: user,
});