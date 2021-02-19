export function getUser(username, password) {
  return (dispatch) => {
    dispatch({
      type: "GET_USER",
      payload: {
        email: "email@mail.com",
        username,
        company_name: "Good Company",
        category: "The best",
        history: [
          { _id: 1, name: "tahu" },
          { _id: 2, name: "tempe" },
          { _id: 3, name: "nasi" },
        ],
      },
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
}
