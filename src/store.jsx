import { createStore } from 'redux';
import agreementReducer from './reducers';

const store = createStore(agreementReducer);

export default store;