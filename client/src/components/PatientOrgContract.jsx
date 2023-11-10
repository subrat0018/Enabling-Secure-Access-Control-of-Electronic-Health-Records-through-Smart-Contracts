// PatientOrgContract.jsx
import React from 'react';

const PatientOrgContract = ({ ownerName, accessControl, resourceId }) => {
  // Assume you have data for the POC
  // You can map over the accessControl array and display the resources

  return (
    <div className="bg-gray-200 p-4 mb-4 rounded-md">
      <h3 className="text-xl font-bold mb-2">Patient Org Contract</h3>
      <p className="text-lg">Owner Name: {ownerName}</p>
      <p className="text-lg">Access Control: {accessControl.join(', ')}</p>
      <p className="text-lg">Resource ID: {resourceId}</p>
    </div>
  );
};

export default PatientOrgContract;
