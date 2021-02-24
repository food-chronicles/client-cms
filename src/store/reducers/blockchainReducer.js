const initialState = {
  blockchainDetail: {
    chain: [],
  },
  qrCodeLink: "",
  isLoading: false,
  isLoadingUpdate: false,
  error: null,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BLOCKCHAIN_DETAIL":
      // console.log(action.payload, "ini di reducer berhasil bikin baru");
      return {
        ...state,
        blockchainDetail: action.payload,
      };

    case "UPDATE_QRCODE_LINK":
      return {
        ...state,
        qrCodeLink:
          process.env.REACT_APP_CLIENT_URL + "/product/" + action.payload,
      };

    case "RESET_QR_CODE_LINK":
      return {
        ...state,
        qrCodeLink: "",
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_LOADING_UPDATE":
      return {
        ...state,
        isLoadingUpdate: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default blockchainReducer;
