import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../store/actions/blockchainAction";
import FormUpdate from "../components/FormUpdate";
import Lottie from 'lottie-react'
import LoadingBall from '../assets/4316-loading-gaocaisheng.json'

const style = {
  height: 500,
  width: 500,
};

function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const blockchainId = params.id;
  const { blockchainDetail, qrCodeLink, isLoading, error } = useSelector(
    (state) => state.blockchain
  );

  useEffect(() => {
    dispatch(getDetails(blockchainId));
  }, []);



  if (isLoading) {
    return <div className="container flex items-center justify-center h-screen">
      <p><Lottie animationData={LoadingBall} style={style} />;</p>;
    </div>
  }
  if (error) {
    return <div className="container mx-auto p-6 text-center">
      <p>{JSON.stringify(error)}</p>;
    </div>
  }
  return (
    <div className="container mx-auto p-6 text-center">
      {/* <p>{JSON.stringify(blockchainDetail.chain, null, 4)} ini blockchain detail</p> */}
      <h1 className="form-text font-bold text-2xl my-5 self-center">
        Product Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 m-4 my-5 py-5 justify-items-center border-b-4">
        <p>{blockchainDetail.name}</p>
        <div>
          <QRCode
            value={"http://localhost:3000/product/" + blockchainDetail._id}
          />
        </div>
      </div>

      <h1 className="form-text font-bold text-2xl">History</h1>
      <FormUpdate />
      {blockchainDetail.chain
        .slice(0)
        .reverse()
        .map((history) => {
          return (
            <div
              key={history.index}
              className="mx-auto max-w-lg mb-2 p-6 mt-4 bg-white rounded-lg shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <p className="self-center">{history.timestamp}</p>
                <div>
                  <div>
                    {typeof history.data === "string" ? (
                      "Genesis Block"
                    ) : (
                      <div>
                        {
                          // JSON.stringify(Object.keys(history.data))
                          Object.keys(history.data).map((key, index) => {
                            return (
                              <p key={index}>
                                {key}: {history.data[key]}
                              </p>
                            );
                          })
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProductDetails;
