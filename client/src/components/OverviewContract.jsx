// OverviewContract.jsx
import React from 'react';

const OverviewContract = () => {
  // Assume you have data for the overview contract
  const patientName = 'John Doe';
  const patientStatus = 'Healthy';

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded-md">
      <h2 className="text-2xl font-bold mb-2">Overview Contract</h2>
      <p className="text-lg">Patient Name: {patientName}</p>
      <p className="text-lg">Status: {patientStatus}</p>
    </div>
  );
};

export default OverviewContract;
