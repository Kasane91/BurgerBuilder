import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTH_START) {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }
  if (action.type === actionTypes.AUTH_SUCCESS) {
    return {
      ...state,
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false,
    };
  }

  if (action.type === actionTypes.AUTH_FAIL) {
    return { ...state, error: action.error, loading: false };
  }

  if (action.type === actionTypes.LOG_OUT) {
    return initialState;
  }

  return state;
};

export default reducer;
