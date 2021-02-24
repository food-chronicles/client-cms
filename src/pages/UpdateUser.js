import React from "react";
import FormUpdateUser from "../components/FormUpdateUser";
import fc_logo_md from "../assets/fc_logo_md.png";

const UpdateUser = () => {
  return (
    <div className="container mx-auto p-6 mb-10 text-center">
      <div className="flex justify-center">
        <img src={fc_logo_md} className="w-96" alt="logo"></img>
      </div>
      <FormUpdateUser />
    </div>
  );
};

export default UpdateUser;
