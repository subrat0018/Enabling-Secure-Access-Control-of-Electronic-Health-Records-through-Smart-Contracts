//EnrollmentContract
const enroll = async (contract,name,patientAddress,aadharNumber) => {
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
