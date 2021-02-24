import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getUserInfo, updateUser } from '../store/actions/userAction'
import { successToaster, errorToaster } from "../utils/toaster";

const FormUpdateUser = () => {
  const id = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [company_name, setCompany] = useState('')
  const [category, setCategory] = useState('')

  const {
    email:dataEmail,
    username:dataUsername,
    company_name:dataCompany,
    category:dataCategory,
    isLoading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo());

    setUsername(dataUsername)
    setEmail(dataEmail)
    setCompany(dataCompany)
    setCategory(dataCategory)
  }, [])

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleCompany = (e) => {
    setCompany(e.target.value)
  }

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username) {
      return errorToaster("Missing field!", "Username is required");
    }
    if (!email) {
      return errorToaster("Missing field!", "Email must be uploaded");
    }
    if (!company_name) {
      return errorToaster("Missing field!", "Company Name must be uploaded");
    }
    if (!category) {
      return errorToaster("Missing field!", "Category must be uploaded");
    }
    let payload = {
      username,
      email,
      company_name,
      category
    }
    dispatch(updateUser(payload, id))
    history.push('/')
  }

  return (
    <div className="max-w-md mx-auto justify-center p-6 flex bg-gray-100 mt-10 rounded shadow-xl">
          <form className='w-full' action='' onSubmit={handleLogin}>
              <div className='flex flex-col w-full text-left mb-4'>
                <label className='form-text mr-2 font-bold text-lg' htmlFor="username">Username</label>
                <input className='border w-full border-blue-400 rounded-md py-2 px-3 text-grey-darknest' onChange={handleUsername} type="text" name="username" id="username" value={username} />
              </div>
              <div className='flex flex-col w-full text-left mb-4'>
                <label className='form-text mr-2 font-bold text-lg' htmlFor="email">Email</label>
                <input className='border w-full border-blue-400 rounded-md py-2 px-3 text-grey-darknest' onChange={handleEmail} type="text" name="email" id="email" value={email} />
              </div>
              <div className='flex flex-col w-full text-left mb-4'>
                <label className='form-text mr-2 font-bold text-lg' htmlFor="company">Company Name</label>
                <input className='border border-blue-400 rounded-md py-2 px-3 text-grey-darknest' onChange={handleCompany} type="text" name="company" id="company" value={company_name} />
              </div>
              <div className='flex flex-col w-full text-left mb-4'>
                <label className='form-text mr-2 font-bold text-lg' htmlFor="category">category</label>
                <select className='border w-full border-blue-400 rounded-md py-2 px-3 text-grey-darknest' value={category} onChange={handleCategory} name="category" id="category">
                  <option value="Producer">Producer</option>
                  <option value="Manufacture">Manufacture</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              <button className='button-form p-2 m-2 rounded-lg' type="submit">Save</button>
              <Link to='/'>
                <button className='button-form p-2 m-2 rounded-lg' type="reset">Cancel</button>
              </Link>
          </form>
    </div>
  );
};

export default FormUpdateUser;