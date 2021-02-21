const initialState = {
  blockchainDetail: {
    chain: []
  },
  qrCodeLink: "",
  isLoading: false,
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
        qrCodeLink: "http://localhost:3000/product/" + action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
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
