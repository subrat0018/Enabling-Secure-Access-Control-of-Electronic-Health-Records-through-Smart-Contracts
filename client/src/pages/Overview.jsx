import React from 'react'
import Box from '../components/Box';

const OrganizationRegistration = () => {
  return (
    <div className="bg-blue-200 p-4">
      <Box text="Register Your Organization" color="bg-blue-400" />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-blue-200 p-4">
      <Box text="See Your Dashboard" color="bg-green-400" />
    </div>
  );
};




const Overview = () => {
  return (
    <div className='flex justify-around'>
      <OrganizationRegistration/>
      <Dashboard/>
    </div>
  )
}

export default Overview
