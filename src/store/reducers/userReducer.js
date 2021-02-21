const initialState = {
  _id: "",
  username: "",
  company_name: "",
  category: "",
  history: "",
  isLoading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      const { _id, username, company_name, category, history } = action.payload;
      return {
        ...state,
        _id,
        username,
        company_name,
        category,
        history,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload
      }
    
      case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      }

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
