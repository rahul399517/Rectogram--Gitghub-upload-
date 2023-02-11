const initialState = {
  //user: {},
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        // user: action.payload,
        ...action.payload,
      };
    //break;
    case "LOGOUT":
      return initialState;
    //break
    case "LOGIN_ERROR":
      return initialState;
    //break;
    default:
      return initialState;
  }
};
