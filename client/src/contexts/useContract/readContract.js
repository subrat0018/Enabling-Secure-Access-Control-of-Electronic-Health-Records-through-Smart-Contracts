//Enrollment
const getPatient = async (contract,patientAddress) => {
    if (!contract) {
      return false;
    }
    const res = await contract.methods.getPatient(patientAddress).call();
    return res;
  };

//OverviewContract
//PatientOrgContract

