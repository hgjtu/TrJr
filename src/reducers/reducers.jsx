import { TOGGLE_AGREEMENT } from '../actions/actions';

const initialState = {
  agreed: false,
};

const agreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AGREEMENT:
      return {
        ...state,
        agreed: !state.agreed,
      };
    default:
      return state;
  }
};

export default agreementReducer;