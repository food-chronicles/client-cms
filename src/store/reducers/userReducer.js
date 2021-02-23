const initialState = {
  _id: "",
  username: "",
  company_name: "",
  category: "",
  history: [],
  isLoading: false,
  isLoadingHistory: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      const { _id, username, company_name, category } = action.payload;
      return {
        ...state,
        _id,
        username,
        company_name,
        category,
      };

    case "GET_USER_HISTORY":
      const history = action.payload;
      return {
        ...state,
        history
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_LOADING_HISTORY":
      return {
        ...state,
        isLoadingHistory: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
