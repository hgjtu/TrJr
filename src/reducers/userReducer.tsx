import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';


export interface UserState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>){
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;