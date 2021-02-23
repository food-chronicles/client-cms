import History from "../components/History";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../store/actions/userAction";

function Home() {
  const dispatch = useDispatch();
  const {
    _id,
    username,
    email,
    company_name,
    category,
    isLoading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="md:flex no-wrap md:-mx-2">
        {/* Bagian Kiri */}
        <div className="w-full md:w-3/12 md:mx-2 mb-10">
          <div className="bg-white p-3 text-center md:text-left">
            <h1 className="text-gray-900  text-xl leading-8 mt-1 mb-5 pb-2 border-b-4 border-blue-400 ">
              Profile
            </h1>
            <h1 className="text-gray-900 font-bold text-2xl leading-8 my-2">
              {username}
            </h1>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              {_id}
            </p>
            <h3 className="text-gray-600 font-lg text-semibold leading-6 mb-2">
              {email}
            </h3>
            <h3 className="text-gray-600 font-bold text-xl leading-6">
              {company_name}
            </h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              {category}
            </p>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 rounded-sm">
            {/* <h1 className="text-gray-900 text-xl leading-8 my-1 text-center mt-1 mb-5 pb-2 border-b-4 border-blue-400">
              History
            </h1> */}
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
