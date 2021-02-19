import React from 'react'
import FormLogin from '../components/FormLogin'

function Login() {

  return (
    <div className='container mx-auto p-6 text-center'>
      <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
        <span className='logo-food-color'>Food</span> Chronicles
      </h1>
      <FormLogin />
    </div>
  );
}

export default Login;
