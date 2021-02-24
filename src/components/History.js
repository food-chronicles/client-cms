import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistory, searchProduct } from "../store/actions/userAction";
import Lottie from "lottie-react";
import LoadingBall from "../assets/4316-loading-gaocaisheng.json";

const style = {
  height: 500,
  width: 500,
};

const History = () => {
  const dispatch = useDispatch();

  const { filteredHistory, isLoadingHistory, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserHistory());
  }, []);

  if (isLoadingHistory) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <Lottie animationData={LoadingBall} style={style} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center mx-auto">
        {filteredHistory.length === 0 && (
          <div className="mt-20">
            <h1 className="text-center">There's no record yet</h1>
            <h1>
              Start by <Link to="/scan">Scanning a QR Code</Link> or by{" "}
              <Link to="/create">Creating a new product chain</Link>
            </h1>
          </div>
        )}
        {filteredHistory.length > 0 &&
          filteredHistory.slice(0).reverse().map((historyItem) => {
            return (
              <Link
                to={`product/${historyItem._id}`}
                key={historyItem._id}
                className="sm:grid grid-cols-5 bg-white shadow-lg p-7 relative lg:max-w-lg sm:p-4 rounded-lg lg:col-span-2 mx-5 mb-5"
              >
                <img
                  src={historyItem.image_url}
                  alt="Just a flower"
                  className="w-full rounded-lg"
                />
                <div className="pt-5 self-center sm:pt-0 sm:pl-10 col-span-3">
                  <h2 className="text-gray-800 capitalize text-xl font-bold">
                    {historyItem.name}
                  </h2>
                  <p className="inline-block pt-2">
                    <span className="underline">
                    {historyItem._id}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default History;
