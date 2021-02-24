import React from "react";
import FormLogin from "../components/FormLogin";
import fc_logo_md from "../assets/fc_logo_md.png";

function Login() {
  return (
    <div className="container mx-auto mb-20 p-6 text-center">
      <div className="flex justify-center">
        <img src={fc_logo_md} className="w-96" alt="logo"></img>
      </div>
      <FormLogin />
    </div>
  );
}

export default Login;
