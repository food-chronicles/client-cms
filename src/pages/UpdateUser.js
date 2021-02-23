import React from 'react';
import FormUpdateUser from '../components/FormUpdateUser';

const UpdateUser = () => {
    return (
        <div className='container mx-auto p-6 text-center'>
          <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
            <span className='logo-food-color'>Food</span> Chronicles
          </h1>
          <FormUpdateUser/>
        </div>
      );
};

export default UpdateUser;