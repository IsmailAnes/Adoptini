import { GET_USER,LOGOUT } from '../../actions/actionTypes';

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
      case LOGOUT:
        return {
         initialState
        };
    default:
      return state;
  }
};

export default reducer;
