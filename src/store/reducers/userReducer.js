const initialState = {
  _id: "",
  username: "",
  email:"",
  password:"",
  company_name: "",
  email: "",
  category: "",
  textSearch: "",
  history: [],
  isLoading: false,
  isLoadingHistory: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      const { _id, username, email, company_name, category } = action.payload;
      return {
        ...state,
        _id,
        username,
        email,
        company_name,
        category,
      };

    case "GET_USER_HISTORY":
      const history = action.payload;
      return {
        ...state,
        history
      };

      case "SEARCH_ITEM":
        const search = action.payload;
        console.log(search, 'from redux');
        return {
          ...state,
          textSearch: action.text,
          history: search
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
