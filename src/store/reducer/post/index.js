import { GET_POST } from '../../actions/actionTypes';

const initialState = {
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_POST:
        return {
          ...state,
          posts: action.payload,
        };
    default:
      return state;
  }
};

export default reducer;
