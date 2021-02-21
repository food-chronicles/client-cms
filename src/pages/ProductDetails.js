import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../store/actions/blockchainAction";
import FormUpdate from "../components/FormUpdate";

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
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="container mx-auto p-6 text-center">
      {/* <p>{JSON.stringify(blockchainDetail.chain, null, 4)} ini blockchain detail</p> */}
      <h1 className="form-text font-bold text-2xl my-5 self-center">
        Product Details
      </h1>
      <div className="grid grid-cols-2 my-5 py-5 justify-items-center border-b-4">
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
              className="mx-auto max-w-lg p-6 mt-4 bg-white rounded-lg shadow-xl"
            >
              <div className="grid grid-cols-2">
                <p className="self-center">{history.timestap}</p>
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
