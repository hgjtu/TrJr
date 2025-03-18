import { createStore } from 'redux';
import agreementReducer from '../reducers/reducers';
import authReducer from '../reducers/authReduser';

const rootReducer = combineReducers({
    user: authReducer,
    agreement: agreementReducer,
});

const store = createStore(rootReducer);

export default store;