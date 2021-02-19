import React, { useState } from 'react'
import {
  useHistory,
  useLocation,
} from "react-router-dom"
import { useAuth } from "../auth"

const Form = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const location = useLocation()
  const auth = useAuth();
  let { from } = location.state || { from: { pathname: "/" } }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    let payload = {
      username,
      password
    }
    console.log(payload);
    console.log(from, 'ini page asal dia')
    auth.signin(payload,() => {
      history.replace(from);
      // history.push('/')
    })
    
  };

  return (
    <>
      <form action="" onSubmit={handleLogin}>
        <div className="flex flex-row mb-4">
          <label className="form-text mr-2 font-bold text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
            onChange={handleUsername}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-row mb-4">
          <label className="form-text mr-3 font-bold text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
            onChange={handlePassword}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className="button-form p-2 rounded-lg" type="submit">
          Log In
        </button>
      </form>
    </>
  );
};

export default Form;
