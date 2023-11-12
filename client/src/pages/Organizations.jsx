// Organizations.jsx
import React from 'react';

const organizationsData = [
  {
    id: 1,
    name: 'HealthCare Plus',
    description: 'Providing comprehensive healthcare services.',
    location: 'Cityville, State',
  },
  {
    id: 2,
    name: 'Wellness Hub',
    description: 'Promoting wellness and healthy living.',
    location: 'Townsville, State',
  },
  // Add more organizations as needed
];

const Organizations = () => {
  return (
    <div className="text-center mt-16 ml-4 mr-4">
      <h1 className="text-4xl font-bold mb-4">Available Organizations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizationsData.map((organization) => (
          <div key={organization.id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{organization.name}</h2>
            <p className="text-gray-600 mb-2">{organization.description}</p>
            <p className="text-gray-500">{organization.location}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
              // You can add an onClick handler to navigate or perform actions
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
