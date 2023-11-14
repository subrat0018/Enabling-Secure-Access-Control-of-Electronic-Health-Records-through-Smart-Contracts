const EnrollContract = artifacts.require("EnrollmentContract");
const OverviewContract = artifacts.require("OverviewContract");
const OverviewContractFactory = artifacts.require("OverviewContractFactory");
const PatientOrgContract = artifacts.require("PatientOrgContract");
module.exports = function (deployer) {
  // deployer.deploy(EnrollContract);
  // deployer.deploy(OverviewContract);
  // deployer.deploy(OverviewContractFactory);
  deployer.deploy(PatientOrgContract)
};
