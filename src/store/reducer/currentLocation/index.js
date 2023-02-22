import { GET_LOCATION } from '../../actions/actionTypes';

const initialState = {
  currentLocation: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_LOCATION:
        return {
          ...state,
          currentLocation: action.payload,
        };
    default:
      return state;
  }
};

export default reducer;
