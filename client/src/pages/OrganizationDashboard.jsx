// CreateContractPage.jsx
import React, { useState } from "react";
import { useContext } from "react";
import Web3Context from "../contexts";
import { addOrganizationForPatient, getPatientData, updatePatientData } from "../contexts/useContract/writeContract";
import { getPatientSpecificUri } from "../contexts/useContract/readContract";
import client from '../utils/ipfs';
import lighthouse from "@lighthouse-web3/sdk"


const OrganizationDashboard = () => {
  const [fileURL, setFileURL] = useState(null)
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

  const decrypt = async(cid1) =>{
    // Fetch file encryption key
    const cid = cid1 //replace with your IPFS CID
    const {signature, signerAddress} = await signAuthMessage()
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
       //const res = await getPatientSpecificUri(_PatientOrgContract,contractData)

    const keyObject = await lighthouse.fetchEncryptionKey(
      cid1,
      signerAddress,
      signature
    )

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */
   
    const fileType = "image/png"
    const decrypted = await lighthouse.decryptFile(cid1, keyObject.data.key,fileType)
    console.log("hello",decrypted)
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted)
    console.log(url)
    setFileURL(url)
    return url
  }
 


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
            placeholder="0x0106B72164234f8Dca99D38415Ce00C133b93B70"
            value={contractData.patientAddr}
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
            placeholder="Xray"
            value={contractData.dataType}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={async(e)=>{
              e.preventDefault();
              const res = await getPatientData(_PatientOrgContract, contractData.dataType, contractData.patientAddr, account.currentAccount);
              if(!res)
              {
                alert("You don't have Access");
              }
              else
              {
                 await decrypt(res).then((res1)=>(
                  setFileURL(res1)
              
                 ))
                // alert(`https://decrypt.mesh3.network/evm/${res}`)
              //   fileURL?
              //   <a href={fileURL} target="_blank">viewFile</a>
              // :
              //   null
                
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
