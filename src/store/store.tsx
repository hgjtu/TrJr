import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import agreementReducer from '../reducers/reducers';
import userReducer from '../reducers/userReducer';


export const store = configureStore({
    reducer: {
      user: userReducer,
      agreement: agreementReducer,
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']