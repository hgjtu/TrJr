import { IUser } from "../../models/IUser";

export const SET_AUTH = 'SET_AUTH';
export const SET_USER = 'SET_USER';

export interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: boolean;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: IUser | null;
}

export type AuthActionTypes = SetAuthAction | SetUserAction;