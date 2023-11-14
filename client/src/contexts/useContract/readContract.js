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
const getAccessList =async(contract)=>{
  const res = await contract.methods.getPatientDataTypes().call();
  let arr=[];
  for(let i=0;i<res.length;i++){
    const data = await contract.methods.getOrganizationsAccessForDataType(res[i]).call();
    arr.push({type:res[i],data});
  }
  return arr;

} 
const getOrgData =async(contract, account)=>{
  const res = await contract.methods.getAllOrganizationsWithAccess(account).call();
  let arr = []
  for(let i=0;i<res.length;i++){
    console.log(i, res[i]);
    arr.push(res[i])
  }
  // arr.push(res)
  // console.log(res)
  return arr;
} 

const getPatientDataUri = async(contract)=> {
  const res = await contract.methods.getPatientDataTypes().call();
  let arr=[];
  for(let i=0;i<res.length;i++){
    const data = await contract.methods.getPatientDataUri(res[i]).call();
    arr.push({type:res[i],data});
  }
} 

export  {getPatient, getAccessList, getOrgData, getPatientDataUri}