import axios from "axios";
import { successToaster, errorToaster } from "../../utils/toaster";

export function createBlockchain(payload) {
  return async (dispatch) => {
    try {
      let newChain = await axios({
        url: "http://localhost:4000/product",
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: payload.name,
          location: {
            longitude: payload.position.longitude,
            latitude: payload.position.latitude,
          },
          image_url: payload.image_url,
          data: payload.data,
        },
      });
      dispatch({
        type: "UPDATE_BLOCKCHAIN_DETAIL",
        payload: newChain.data,
      });
      dispatch({
        type: "UPDATE_QRCODE_LINK",
        payload: newChain.data._id,
      });
      successToaster("Success!", "Entry has been saved")
    } catch (error) {
      errorToaster("Oops!", error.message)
      console.log(error, "error create blockchain");
    }
  };
}

export function updateBlockchain(id, payload) {
  return async (dispatch) => {
    try {
      console.log(id, payload, "ini di action");
      let newChain = await axios({
        url: "http://localhost:4000/product/" + id,
        method: "PUT",
        headers: {
          access_token: localStorage.access_token,
          key: payload.key,
        },
        data: {
          location: {
            longitude: payload.position.longitude,
            latitude: payload.position.latitude,
          },
          image_url: payload.image_url,
          data: payload.data,
        },
      });
      dispatch(getDetails(id));
      successToaster("Success!", "Entry has been saved")
    } catch (error) {
      errorToaster("Oops!", error.message)
      console.log(error, "error update blockchain");
    }
  };
}

export function getDetails(id) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let details = await axios({
        url: "http://localhost:4000/product/" + id,
        method: "GET",
      });
      dispatch(setLoading(false));
      dispatch(setError(null));
      dispatch({
        type: "UPDATE_BLOCKCHAIN_DETAIL",
        payload: details.data,
      });
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
      errorToaster("Oops!", error.message)
      console.log((error, "error get blockchain details"));
    }
  };
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
