import axios from 'axios'

export function getUserInfo() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      let userInfo = await axios ({
        url:'http://localhost:4000/product',
        method: "GET",
        headers: {
          access_token: localStorage.access_token
        }
      })
      dispatch(setLoading(false))
      dispatch(setError(null))
      dispatch({
        type: "GET_USER",
        payload: userInfo.data
      })
    } catch (error) {
      dispatch(setLoading(false))
      dispatch(setError(error))
      console.log(error, 'ini error di get user info')
    }
  }
}

function setLoading(status) {
  return {
    type: "SET_LOADING",
    payload: status,
  };
}

function setError(error) {
  return {
    type: "SET_ERROR",
    payload: error,
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
}
