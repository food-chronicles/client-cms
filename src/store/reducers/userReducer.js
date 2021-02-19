const initialState = {
  email: "",
  username: "",
  // password: "",
  company_name: "",
  category: "",
  history: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      const {
        email,
        username,
        company_name,
        category,
        history,
      } = action.payload;
      return {
        ...state,
        email,
        username,
        company_name,
        category,
        history,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
