import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterHistory,
  getUserHistory,
  setSearch,
} from "../store/actions/userAction";
import useDebounce from "../utils/useDebounced";

const SearchBar = () => {
  const dispatch = useDispatch();

  const { history, search } = useSelector((state) => state.user);

  const handleInputSearch = (searchTerm) => {
    dispatch(setSearch(searchTerm));
  };

  const debouncedSearchTerm = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      dispatch(filterHistory(debouncedSearchTerm));
      console.log(debouncedSearchTerm, "ini yang mau dicari");
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="container flex justify-center">
      <div className="lg:max-w-lg">
        <div className="relative text-gray-600 mb-5">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={search}
              className="bg-gradient-to-b from-blue-200 to-blue-100 w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              onChange={(e) => handleInputSearch(e?.target?.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
