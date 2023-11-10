// Dashboard.jsx
import React from 'react';
import OverviewContract from '../components/OverviewContract';
import PatientOrgContract from '../components/PatientOrgContract';

const Dashboard = () => {
  // Assume you have data for the patient's overview contract
  const overviewContractData = {
    patientName: 'John Doe',
    patientStatus: 'Healthy',
  };

  // Assume you have data for Patient Org Contracts
  const patientOrgContractsData = [
    {
      ownerName: 'Dr. Smith',
      accessControl: ['View Records', 'Prescribe Medication'],
      resourceId: '123456',
    },
    {
      ownerName: 'Hospital A',
      accessControl: ['View Records'],
      resourceId: '789012',
    },
    // Add more POCs as needed
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>

      {/* Display Overview Contract */}
      <OverviewContract {...overviewContractData} />

      {/* Display Patient Org Contracts */}
      <h2 className="text-2xl font-bold mb-4">Patient Org Contracts</h2>
      {patientOrgContractsData.map((poc, index) => (
        <PatientOrgContract key={index} {...poc} />
      ))}
    </div>
  );
};

export default Dashboard;
