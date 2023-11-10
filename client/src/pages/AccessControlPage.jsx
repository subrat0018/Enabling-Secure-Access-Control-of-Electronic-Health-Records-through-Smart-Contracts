// AccessControlPage.jsx
import React, { useState } from 'react';

const AccessControlPage = () => {
  const [accessKey, setAccessKey] = useState('');
  const [organizationsData, setOrganizationsData] = useState([
    { id: 1, name: 'Hospital A', accessControls: ['View Records', 'Prescribe Medication'], grantedAccess: [] },
    { id: 2, name: 'Clinic B', accessControls: ['View Records', 'Schedule Appointments'], grantedAccess: [] },
    { id: 3, name: 'Pharmacy C', accessControls: ['Dispense Medications'], grantedAccess: [] },
  ]);

  const [organizations, setOrganizations] = useState(organizationsData);
  const [isAccessKeyValid, setIsAccessKeyValid] = useState(false);

  const handleToggleAccess = (organizationId, accessControl) => {
    // Check if the access key is valid before making changes
    if (isAccessKeyValid) {
      setOrganizations((prevOrgs) =>
        prevOrgs.map((org) => {
          if (org.id === organizationId) {
            const isAccessGranted = org.grantedAccess.includes(accessControl);
            return {
              ...org,
              grantedAccess: isAccessGranted
                ? org.grantedAccess.filter((access) => access !== accessControl)
                : [...org.grantedAccess, accessControl],
            };
          }
          return org;
        })
      );
    }
  };

  const handleSaveAccess = () => {
    // Implement logic to save the granted access
    console.log('Saving access:', organizations);
  };

  const handleAccessKeyChange = (e) => {
    setAccessKey(e.target.value);
    // For simplicity, let's assume the correct access key is '123456'
    setIsAccessKeyValid(e.target.value === '123456');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Access Control</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Enter Access Key:</label>
        <input
          type="password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            isAccessKeyValid ? 'border-gray-300' : 'border-red-500'
          }`}
          placeholder="Access Key"
          value={accessKey}
          onChange={handleAccessKeyChange}
        />
        {!isAccessKeyValid && (
          <p className="text-red-500 text-xs italic mt-1">Incorrect access key. Please try again.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((organization) => (
          <div key={organization.id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">{organization.name}</h2>
            <p className="mb-2">Granted Access:</p>
            <ul>
              {organization.grantedAccess.map((access) => (
                <li key={access}>{access}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="font-bold mb-2">Available Access Controls:</p>
              {organization.accessControls.map((accessControl) => (
                <div key={accessControl} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`${organization.id}-${accessControl}`}
                    checked={organization.grantedAccess.includes(accessControl)}
                    onChange={() => handleToggleAccess(organization.id, accessControl)}
                    className="mr-2"
                  />
                  <label htmlFor={`${organization.id}-${accessControl}`}>{accessControl}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${isAccessKeyValid ? '' : 'cursor-not-allowed'}`}
          onClick={handleSaveAccess}
          disabled={!isAccessKeyValid}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccessControlPage;
