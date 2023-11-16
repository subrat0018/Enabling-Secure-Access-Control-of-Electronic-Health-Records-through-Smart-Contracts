// AccessControlPage.jsx
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Web3Context from "../contexts";
import { getOrgData } from "../contexts/useContract/readContract";
import { grantAccess, revokeAccess } from "../contexts/useContract/writeContract";
import { useNavigate } from "react-router-dom";

const AccessControlPage = () => {
  const navigate = useNavigate();
  const { account, _PatientOrgContract } = useContext(Web3Context);
  const [access, setAccess] = useState("");
  const [organizationsData, setOrganizationsData] = useState();

  const [organizations, setOrganizations] = useState();
  const [isAccessKeyValid, setIsAccessKeyValid] = useState(false);
  async function resolve() {
    const res = await getOrgData(_PatientOrgContract, account.currentAccount);
    setOrganizationsData(res);
    // console.log("Hi", typeof organizationsData);
  }
  useEffect(() => {
    resolve();
  }, [_PatientOrgContract]);

  const handleSaveAccess = () => {
    // Implement logic to save the granted access
    console.log("Saving access:", organizations);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Access Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizationsData &&
          organizationsData.map((organization) => (
            <div key={organization.id} className="bg-gray-200 p-4 rounded-md">
              <h2 className="text-lg font-bold mb-2">
                {organization.name}
              </h2>
              <h2 className="text-lg font-bold mb-2">
                {organization.orgAddress}
              </h2>
              <p className="mb-2">Granted Access:</p>
              <ul>
                {organization.hasAccess &&
                  organization.hasAccess.map((access) => {
                    return access.hasAccess ? (
                      <div className="flex justify-between"><li key={access}>{access.dataType}</li><button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={async (e) => {
                        e.preventDefault();
                        await revokeAccess(
                          _PatientOrgContract,
                          account.currentAccount,
                          organization.orgAddress,
                          access.dataType
                        );
                        setAccess("");
                        alert("Access Revoked");
                        window.location.reload();
                      }}
                    >
                      Revoke
                    </button></div>
                    ) : (
                      ""
                    );
                  })}
                
              </ul>
              <div className="mt-4">
                <p className="font-bold mb-2">Available Access Controls:</p>
                <ul>
                {organization.hasAccess &&
                  organization.hasAccess.map((access) => {
                    return access.hasAccess ? (
                      ""
                    ):(
                      <div className="flex justify-between"><li key={access}>{access.dataType}</li><button
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={async (e) => {
                        e.preventDefault();
                        await grantAccess(
                          _PatientOrgContract,
                          account.currentAccount,
                          organization.orgAddress,
                          access.dataType
                        );
                        setAccess("");
                        alert("Access Granted");
                        window.location.reload();
                      }}
                    >
                      Grant
                    </button></div>
                    ) ;
                  })}
                
              </ul>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Access Control:
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="accessControl"
                    value={access}
                    placeholder="accessControl"
                    className="mr-2 shadow appearance-none border rounded py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (!access) {
                        alert("Access ");
                      }
                      await grantAccess(
                        _PatientOrgContract,
                        account.currentAccount,
                        organization.orgAddress,
                        access
                      );
                      setAccess("");
                      alert("Access Added");
                      window.location.reload();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
{/* 
      <div className="mt-8 flex justify-end">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
            isAccessKeyValid ? "" : "cursor-not-allowed"
          }`}
          onClick={handleSaveAccess}
          disabled={!isAccessKeyValid}
        >
          Save
        </button>
      </div> */}
    </div>
  );
};

export default AccessControlPage;
