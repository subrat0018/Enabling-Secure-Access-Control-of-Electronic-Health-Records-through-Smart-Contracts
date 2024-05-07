import React from 'react'
import { Link } from 'react-router-dom'
// import home from "../assets/home.jpg"

const Home = () => {
  return (
    <div className="text-center mt-6">
      <h1 className="text-4xl font-bold">Patient Homepage</h1>
      <div className='flex flex-row justify-center w-4/5 h-full'>
      <img className='w-3/4' src="https://res.cloudinary.com/dddvy7tax/image/upload/v1714986260/home_moutxb.jpg" alt="" />
      <div className="flex justify-center space-x-4 items-center">
        <Link to="/enroll" className="bg-gray-300 text-white py-2 px-4 rounded-md w-40 h-32 flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-500  hover:text-3xl">
          Enroll
        </Link>
        <Link to="/create-contract" className="bg-gray-300 text-white py-2 px-4 rounded-md w-40 h-32 flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-500  hover:text-3xl">
          Add Org And Data
        </Link>
        {/* <Link to="/dashboard" className="bg-indigo-500 text-white py-2 px-4 rounded-md">
          Dashboard
        </Link> */}
        <Link to="/access-control" className=" bg-gray-300 text-white py-2 px-4 rounded-md w-40 h-32 flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-gray-500  hover:text-3xl">
          Access Control
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Home
