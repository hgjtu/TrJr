import { TOGGLE_AUTH } from '../actions/userActions';

const initialState = {
  isAuth: false,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH:
      return {
        ...state,
        isAuth: !state.isAuth,
      };
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
  }
};

export default userReducer;