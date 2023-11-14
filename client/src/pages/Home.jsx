import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    console.log("Hello")
  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Patient Homepage</h1>
      <div className="flex justify-center space-x-4">
        <Link to="/enroll" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Enroll
        </Link>
        <Link to="/create-contract" className="bg-green-500 text-white py-2 px-4 rounded-md">
          Add Org And Data
        </Link>
        {/* <Link to="/dashboard" className="bg-indigo-500 text-white py-2 px-4 rounded-md">
          Dashboard
        </Link> */}
        <Link to="/access-control" className="bg-purple-500 text-white py-2 px-4 rounded-md">
          Access Control
        </Link>
      </div>
    </div>
  )
}

export default Home
