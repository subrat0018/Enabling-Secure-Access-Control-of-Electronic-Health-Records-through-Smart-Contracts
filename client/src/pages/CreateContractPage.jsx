// CreateContractPage.jsx
import React, { useState } from 'react';

const CreateContractPage = () => {
  const [contractData, setContractData] = useState({
    ownerName: '',
    accessControl: [],
    resourceId: '',
  });

  const [newAccessControl, setNewAccessControl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAccessControlChange = (e) => {
    const { value, checked } = e.target;
    setContractData((prevData) => {
      if (checked) {
        return { ...prevData, accessControl: [...prevData.accessControl, value] };
      } else {
        return { ...prevData, accessControl: prevData.accessControl.filter((item) => item !== value) };
      }
    });
  };

  const handleAddAccessControl = () => {
    if (newAccessControl.trim() !== '') {
      setContractData((prevData) => ({
        ...prevData,
        accessControl: [...prevData.accessControl, newAccessControl],
      }));
      setNewAccessControl('');
    }
  };

  const handleCreateContract = () => {
    // Implement logic to create the Patient Organization Contract
    console.log('Creating contract:', contractData);
    // Reset form after creating the contract
    setContractData({
      ownerName: '',
      accessControl: [],
      resourceId: '',
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Patient Organization Contract</h1>

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Owner Name:</label>
          <input
            type="text"
            name="ownerName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter owner name"
            value={contractData.ownerName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Access Control:</label>
          <div className="mb-2">
            {contractData.accessControl.map((access) => (
              <div key={access} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  value={access}
                  checked={contractData.accessControl.includes(access)}
                  onChange={handleAccessControlChange}
                  className="mr-2"
                />
                <span>{access}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newAccessControl}
              onChange={(e) => setNewAccessControl(e.target.value)}
              placeholder="New Access Control"
              className="mr-2 shadow appearance-none border rounded py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="bg-green-500 text-white py-1 px-2 rounded"
              onClick={handleAddAccessControl}
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Resource ID:</label>
          <input
            type="text"
            name="resourceId"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter resource ID"
            value={contractData.resourceId}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleCreateContract}
          >
            Create Contract
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContractPage;
