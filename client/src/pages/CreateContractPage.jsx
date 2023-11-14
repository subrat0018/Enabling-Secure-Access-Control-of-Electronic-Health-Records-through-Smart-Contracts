// CreateContractPage.jsx
import React, { useState } from "react";
import { useContext } from "react";
import Web3Context from "../contexts";
import { addOrganizationForPatient, updatePatientData } from "../contexts/useContract/writeContract";
import { grantAccess } from "../contexts/useContract/writeContract";
import client from '../utils/ipfs';


const CreateContractPage = () => {
  const {account, _EnrollmentContract, _PatientOrgContract} = useContext(Web3Context);
  const [contractData, setContractData] = useState({
    ownerName: "",
    ownerAddress: "",
    accessControl: "",
    accessFile: ""
  });
  const[Coverimage,setCoverImage] = useState("")
  const [uri,setUri] = useState("")
  const showPhoto = async(e) => {
    //console.log(e.target.files[0]);
    setCoverImage(e.target.files[0]);
    const res = await client.add(e.target.files[0])
    const str = 'https://ipfs.io/ipfs/';
    const finalResult = str.concat(String(res.path));
    setUri(finalResult);
    alert(`Data Successfully Uploaded to IPFS ${finalResult}`);
   
}
  const [newAccessControl, setNewAccessControl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContractData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateContract = async() => {
    // Implement logic to create the Patient Organization Contract
    await updatePatientData(_PatientOrgContract,account.currentAccount,contractData.accessControl,uri)
    alert("Data Added Successfully");
    // Reset form after creating the contract
    setContractData({
      ...contractData,
      accessControl: "",
      accessFile: ""
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Add Organizations and Data
      </h1>

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Organization Name:
          </label>
          <input
            type="text"
            name="ownerName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ABC Org"
            value={contractData.ownerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Organization Address:
          </label>
          <input
            type="text"
            name="ownerAddress"
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
            onClick={async (e)=>{
              e.preventDefault();
              await addOrganizationForPatient(_PatientOrgContract, account.currentAccount,contractData.ownerAddress,contractData.ownerName,"Org");
              alert("Organization Added Successfully");
              setContractData({...contractData,ownerName:"", ownerAddress:""})
            }}
          >
            Add organization
          </button>
         </div>
         <div className=" text-3xl">Add your data</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Access Control:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="accessControl"
              value={contractData.accessControl}
              onChange={handleInputChange}
              placeholder="accessControl"
              className="mr-2 shadow appearance-none border rounded py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className=" mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Upload file
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={showPhoto}
          />
          {/* <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={showPhoto}
          >
            Upload to IPFS
          </button> */}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleCreateContract}
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContractPage;
