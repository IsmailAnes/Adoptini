import { GET_POST_DETAILS } from '../../actions/actionTypes';

const initialState = {
  postDetails: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_POST_DETAILS:
        return {
          ...state,
          postDetails: action.payload,
         // postDetails: {...state.postDetails,[action.payload.id]:action.payload},
        };
    default:
      return state;
  }
};

export default reducer;
