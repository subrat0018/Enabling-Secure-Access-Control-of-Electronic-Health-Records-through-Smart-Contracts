//EnrollmentContract
const enroll = async (contract,account,name,patientAddress,aadharNumber) => {
  console.log(contract)
    if (!contract) {
      return false;
    }
    const res = await contract.methods
      .enrollPatient(name,patientAddress,aadharNumber)
      .send({ from: account });
    return res;
  };

  
//OverviewContract



//PatientOrg
const setPatient= async (contract,account,patientAddress) => {
  console.log(contract)
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .setPatient(patientAddress)
    .send({ from: account });
  return res;
};

const addOrganizationForPatient = async (contract,account,_orgAddress, _name,_role) => {
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .addOrganizationForPatient(_orgAddress,_name,_role)
    .send({ from: account });
  return res;
};

const grantAccess = async(contract,account,_entity,_dataType)=>{
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .grantAccess(_entity,_dataType)
    .send({ from: account });
  return res;
}
const revokeAccess= async(contract,account,_entity, _dataType) =>{
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .revokeAccess(_entity,_dataType)
    .send({ from: account });
  return res;
}
const updatePatientData= async(contract,account,_dataType,_ipfsuri)=>{
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .updatePatientData(_dataType,_ipfsuri)
    .send({ from: account });
  return res;

}
const getPatientData= async(contract,account,_dataType, _patient)=>{
  if (!contract) {
    return false;
  }
  const res = await contract.methods
    .getPatientDataUri(_dataType,_patient)
    .send({ from: account });
  return res;

}

export {enroll, setPatient, addOrganizationForPatient, grantAccess, revokeAccess, updatePatientData, getPatientData}