import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistory } from "../store/actions/userAction";
import Lottie from "lottie-react";
import LoadingBall from "../assets/4316-loading-gaocaisheng.json";

const style = {
  height: 500,
  width: 500,
};

const History = () => {
  const dispatch = useDispatch();
  const { history, isLoadingHistory, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserHistory());
  }, []);

  if (isLoadingHistory) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <p>
          <Lottie animationData={LoadingBall} style={style} />
        </p>
        ;
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto">
      {/* <p>{JSON.stringify(history)}</p> */}
      <div className="flex flex-wrap justify-center mx-auto">
        {
          history.length === 0 && (
            <div className="mt-20">
              <h1 className="text-center">There's no record yet</h1>
              <h1>Start by <Link to='/scan'>Scanning a QR Code</Link> or by <Link to='/create'>Creating a new product chain</Link></h1>
            </div>
          )
        }
        {history.length > 0 &&
          history.map((historyItem) => {
            return (
              <Link
                to={`product/${historyItem._id}`}
                key={historyItem._id}
                className="sm:grid grid-cols-5 bg-white shadow-lg p-7 relative lg:max-w-lg sm:p-4 rounded-lg lg:col-span-2 mx-5 mb-5"
              >
                <img
                  src="https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGZsb3dlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Just a flower"
                  className="w-full rounded-lg"
                />
                <div className="pt-5 self-center sm:pt-0 sm:pl-10 col-span-3">
                  <h2 className="text-gray-800 capitalize text-xl font-bold">
                    {historyItem.name}
                  </h2>
                  <a
                    href="#"
                    className="capitalize underline inline-block pt-2"
                  >
                    {historyItem._id}
                  </a>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default History;
