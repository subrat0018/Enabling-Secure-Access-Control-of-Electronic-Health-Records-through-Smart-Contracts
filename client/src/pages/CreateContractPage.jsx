// CreateContractPage.jsx
import React, { useState } from "react";
import { useContext } from "react";
import Web3Context from "../contexts";
import { addOrganizationForPatient, updatePatientData } from "../contexts/useContract/writeContract";
// import { grantAccess } from "../contexts/useContract/writeContract";
import client from '../utils/ipfs';
import lighthouse from "@lighthouse-web3/sdk"
//b4c37ff0.c7a699df3fd64a39ba782c6cd1aec90e


const CreateContractPage = () => {

  const [file, setFile] = useState(null)

  // Define your API Key (should be replaced with secure environment variables in production)
  const apiKey = "b4c37ff0.c7a699df3fd64a39ba782c6cd1aec90e"

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.")
        }
        const signerAddress = accounts[0]
        const { message } = (await lighthouse.getAuthMessage(signerAddress)).data
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        })
        return { signature, signerAddress }
      } catch (error) {
        console.error("Error signing message with Wallet", error)
        return null
      }
    } else {
      console.log("Please install Wallet!")
      return null
    }
  }

  // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.")
      return
    }

    try {
      // This signature is used for authentication with encryption nodes
      // If you want to avoid signatures on every upload refer to JWT part of encryption authentication section
      const encryptionAuth = await signAuthMessage()
      if (!encryptionAuth) {
        console.error("Failed to sign the message.")
        return
      }

      const { signature, signerAddress } = encryptionAuth

      // Upload file with encryption
      const output = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        signerAddress,
        signature,
        // progressCallback
      )
      console.log("Encrypted File Status:", output)
      /* Sample Response
        {
          data: [
            Hash: "QmbMkjvpG4LjE5obPCcE6p79tqnfy6bzgYLBoeWx5PAcso",
            Name: "izanami.jpeg",
            Size: "174111"
          ]
        }
      */
      // If successful, log the URL for accessing the file
      console.log(
        `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
      )
      
      handleCreateContract(`https://decrypt.mesh3.network/evm/${output.data[0].Hash}`).then(()=>{
        console.log("done")
      })
    } catch (error) {
      console.error("Error uploading encrypted file:", error)
    }
  }

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files
    if (selectedFile) {
      setFile(selectedFile)
    }
  }


  const {account, _EnrollmentContract, _PatientOrgContract} = useContext(Web3Context);
  const [contractData, setContractData] = useState({
    ownerName: "",
    ownerAddress: "",
    accessControl: "",
    accessFile: ""
  });
  // const[Coverimage,setCoverImage] = useState("")
  const [uri,setUri] = useState("")
  const showPhoto = async(e) => {
    //console.log(e.target.files[0]);
    // setCoverImage(e.target.files[0]);
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

  const handleCreateContract = async(uri) => {
    // Implement logic to create the Patient Organization Contract
    // e.preventDefault()
    console.log("hello",uri)
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
            onChange={handleFileChange}
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
            onClick={uploadEncryptedFile}
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContractPage;
