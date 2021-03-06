import History from "../components/History";
import SearchBar from "../components/SearchBar";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../store/actions/userAction";
import Lottie from "lottie-react";
import LoadingBall from "../assets/4316-loading-gaocaisheng.json";
import Footer from "../components/Footer";

const style = {
  height: 500,
  width: 500,
};

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
    return (
      <div className="container flex items-center justify-center h-screen">
        <Lottie animationData={LoadingBall} style={style} />
      </div>
    );
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    // <div className="flex flex-col min-h-screen justify-between">
      <div className="container mx-auto p-6 mb-auto overflow-y-auto md:overflow-visible">
        <div className="md:flex no-wrap md:-mx-2 mb-auto h-screen">
          {/* Bagian Kiri */}
          <div className="w-full md:w-3/12 md:mx-2 mb-10">
            <div className="bg-white p-3 text-center md:text-left">
              <h1 className="text-gray-900  text-xl leading-8 mt-1 mb-5 pb-2 border-b-4 border-blue-400 ">
                Profile
              </h1>
              <h1 className="text-gray-900 font-bold text-2xl leading-8 my-2">
                {username}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6 mb-2">
                {email}
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Company:
              </p>
              <h3 className="text-gray-600 font-bold text-xl leading-6 mb-2">
                {company_name}
              </h3>

              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Role:
              </p>
              <h3 className="text-gray-600 font-bold text-xl leading-6 mb-2">
                {category}
              </h3>
            </div>
            <div className="flex justify-center md:justify-start">
              <Link to={`/user/${_id}`}>
                <button
                  className="button-form py-2 px-4 rounded-lg"
                  type="submit"
                >
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Bagian Kanan */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 rounded-sm">
              <SearchBar />
              <History />
            </div>
          </div>
        </div>
      </div>
    //   <Footer />
    // </div>
  );
}

export default Home;
