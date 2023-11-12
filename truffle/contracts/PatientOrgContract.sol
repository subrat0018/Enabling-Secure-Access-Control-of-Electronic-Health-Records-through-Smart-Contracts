// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientOrgContract {
    struct Organization {
        string name;
        address orgAddress;
        string role;
    }

    struct AccessControl {
        address patient;
        mapping(address => bool) authorizedEntities;
        mapping(string => mapping(address => bool)) authorizedEntitiesForDataType;
        mapping(string => string) patientData;
        string[] dataTypes;
    }

    AccessControl private accessControl;
    mapping(address => Organization[]) public patientOrganizations; // Stores multiple organizations for each patient

    // Events
    event AccessGranted(address indexed entity, string dataType);
    event AccessRevoked(address indexed entity, string dataType);
    event PatientDataUpdated(string dataType, string ipfsUri);
    event OrganizationAdded(address patient, string name, address orgAddress, string role);

    function setPatient(address _patient) public{
           accessControl.patient = _patient;
    }

    modifier onlyPatient() {
        require(msg.sender == accessControl.patient, "Only the patient can perform this action");
        _;
    }

    // Add an organization for the patient
    function addOrganizationForPatient(address _orgAddress, string memory _name, string memory _role) public onlyPatient {
        Organization memory newOrg = Organization(_name, _orgAddress, _role);
        patientOrganizations[accessControl.patient].push(newOrg);
        emit OrganizationAdded(accessControl.patient, _name, _orgAddress, _role);
    }

    // Get all organizations for a patient
    function getPatientOrganizations() public view onlyPatient returns (Organization[] memory) {
        return patientOrganizations[accessControl.patient];
    }

    // Update patient data
    function updatePatientData(string memory _dataType, string memory _ipfsUri) public onlyPatient {
        if (bytes(accessControl.patientData[_dataType]).length == 0) {
            accessControl.dataTypes.push(_dataType);
        }
        accessControl.patientData[_dataType] = _ipfsUri;
        emit PatientDataUpdated(_dataType, _ipfsUri);
    }

    // Get the list of data types
    function getPatientDataTypes() public view returns (string[] memory) {
        return accessControl.dataTypes;
    }

    // Get patient data URI
    function getPatientDataUri(string memory _dataType) public view returns (string memory) {
        require(accessControl.authorizedEntitiesForDataType[_dataType][msg.sender] || msg.sender == accessControl.patient, "Unauthorized access for data type");
        return accessControl.patientData[_dataType];
    }

    // Grant access to a data type
    function grantAccess(address _entity, string memory _dataType) public onlyPatient {
        accessControl.authorizedEntitiesForDataType[_dataType][_entity] = true;
        emit AccessGranted(_entity, _dataType);
    }

    // Revoke access from a data type
    function revokeAccess(address _entity, string memory _dataType) public onlyPatient {
        accessControl.authorizedEntitiesForDataType[_dataType][_entity] = false;
        emit AccessRevoked(_entity, _dataType);
    }
}
