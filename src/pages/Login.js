import React from 'react'
import FormLogin from '../components/FormLogin'

function Login() {

  return (
    <div className='container mx-auto p-6 text-center'>
      <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
        <span className='logo-food-color'>Food</span> Chronicles
      </h1>
      <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
