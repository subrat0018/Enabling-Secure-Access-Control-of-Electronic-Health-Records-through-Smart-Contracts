// CreateContractPage.jsx
import React, { useState } from "react";
import { useContext } from "react";
import Web3Context from "../contexts";
import { addOrganizationForPatient, getPatientData, updatePatientData } from "../contexts/useContract/writeContract";
import { grantAccess } from "../contexts/useContract/writeContract";
import client from '../utils/ipfs';


const OrganizationDashboard = () => {
  const {account, _EnrollmentContract, _PatientOrgContract} = useContext(Web3Context);
  const [contractData, setContractData] = useState({
    patientAddr :"",
    dataType: ""
  });
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateContract = async() => {
    // Implement logic to create the Patient Organization Contract
    updatePatientData(_PatientOrgContract,account.currentAccount)
    // Reset form after creating the contract
    setContractData({
      ownerName: "",
      ownerAddress: "",
      accessControl: "",
      accessFile: ""
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Organization Dashboard
      </h1>

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Patient Address
          </label>
          <input
            type="text"
            name="patientAddr"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ABC Org"
            value={contractData.ownerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Request Data Type
          </label>
          <input
            type="text"
            name="dataType"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0x0106B72164234f8Dca99D38415Ce00C133b93B70"
            value={contractData.ownerAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={(e)=>{
              e.preventDefault();
              const res = getPatientData(_PatientOrgContract, account.currentAccount, contractData.dataType, contractData.patientAddr);
              if(!res)
              {
                alert("You don't have Access");
              }
              else
              {
                alert(`Data Url ${res}`);
              }
            }}
          >
            Request Data
          </button>
         </div>
      </form>
    </div>
  );
};

export default OrganizationDashboard;
