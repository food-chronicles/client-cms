import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
    return (
        <div className='container mx-auto p-6'>
            <h1 className='text-center'>History</h1>
            <div className='flex flex-wrap max-w-3xl mx-auto'>
                <div className='w-full flex flex-col sm:flex-row mx-auto justify-center p-6 bg-gradient-to-b from-blue-200 to-blue-100 mt-10 rounded-lg shadow-xl '>
                    <div className='text-center justify-self-center max-w-sm m-5'>
                        <p className='uppercase text-sm break-words '>8163cbd8feafd38a96cd193f2b44940473c22b21ddbb7445bd99ee310dac28ae</p>
                        <h6 className='logo-chronicles'>ID</h6>
                    </div>
                    <div className='text-center max-w-md m-5'>
                        <p className=''>Oreo</p>
                        <h6 className='logo-chronicles'>Name</h6>
                    </div>
                    <div className='text-center m-5'>
                        <Link to='product/:id'>
                            <button className="button-form w-full p-2 rounded-lg">
                                Detail
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='w-full flex flex-col sm:flex-row mx-auto justify-center p-6 bg-gradient-to-b from-blue-200 to-blue-100 mt-10 rounded-lg shadow-xl '>
                <div className='text-center justify-self-center max-w-sm m-5'>
                        <p className='uppercase text-sm break-words '>8163cbd8feafd38a96cd193f2b44940473c22b21ddbb7445bd99ee310dac28ae</p>
                        <h6 className='logo-chronicles'>ID</h6>
                    </div>
                    <div className='text-center m-5'>
                        <p>Tahu</p>
                        <h6 className='logo-chronicles'>Name</h6>
                    </div>
                    <div className='text-center m-5'>
                        <Link to='product/:id'>
                            <button className="button-form w-full p-2 rounded-lg">
                                Detail
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='w-full flex flex-col sm:flex-row mx-auto justify-center p-6 bg-gradient-to-b from-blue-200 to-blue-100 mt-10 rounded-lg shadow-xl '>
                    <div className='text-center justify-self-center max-w-sm m-5'>
                        <p className='uppercase text-sm break-words '>8163cbd8feafd38a96cd193f2b44940473c22b21ddbb7445bd99ee310dac28ae</p>
                        <h6 className='logo-chronicles'>ID</h6>
                    </div>
                    <div className='text-center m-5'>
                        <p>Sari Roti</p>
                        <h6 className='logo-chronicles'>Name</h6>
                    </div>
                    <div className='text-center m-5'>
                        <Link to='product/:id'>
                            <button className="button-form w-full p-2 rounded-lg">
                                Detail
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default History;