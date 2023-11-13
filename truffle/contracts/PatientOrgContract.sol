// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

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
    struct OrganizationWithAccess {
        string name;
        address orgAddress;
        DataTypeWithAccess[] hasAccess;
    }

    mapping(address => AccessControl) public patientAccessControls; // Mapping to store AccessControl for each patient
    mapping(address => Organization[]) public patientOrganizations; // Stores multiple organizations for each patient

    // Get all organizations and their access for a patient
    function getAllOrganizationsWithAccess() public view returns (OrganizationWithAccess[] memory) {
        AccessControl storage accessControl = patientAccessControls[msg.sender];

        uint orgCount = patientOrganizations[accessControl.patient].length;
        OrganizationWithAccess[] memory orgsWithAccess = new OrganizationWithAccess[](orgCount);

        for (uint i = 0; i < orgCount; i++) {
            Organization memory org = patientOrganizations[accessControl.patient][i];
            orgsWithAccess[i] = OrganizationWithAccess({
                name: org.name,
                orgAddress: org.orgAddress,
                hasAccess: getAllDataTypesWithAccessForOrganization(org.orgAddress)
            });
        }

        return orgsWithAccess;
    }

        function getAllDataTypesWithAccessForOrganization(address _orgAddress) public view onlyPatient returns (DataTypeWithAccess[] memory) {
        AccessControl storage accessControl = patientAccessControls[msg.sender];

        uint dataTypeCount = accessControl.dataTypes.length;
        DataTypeWithAccess[] memory dataTypesWithAccess = new DataTypeWithAccess[](dataTypeCount);

        for (uint i = 0; i < dataTypeCount; i++) {
            string memory dataType = accessControl.dataTypes[i];
            bool hasAccess = accessControl.authorizedEntitiesForDataType[dataType][_orgAddress];

            dataTypesWithAccess[i] = DataTypeWithAccess({
                dataType: dataType,
                hasAccess: hasAccess
            });
        }

        return dataTypesWithAccess;
    }

    // Helper struct to store data type details along with access status
    struct DataTypeWithAccess {
        string dataType;
        bool hasAccess;
    }
    // Events
    event AccessGranted(address indexed entity, string dataType);
    event AccessRevoked(address indexed entity, string dataType);
    event PatientDataUpdated(string dataType, string ipfsUri);
    event OrganizationAdded(address patient, string name, address orgAddress, string role);

    // Set patient access control
    function setPatient(address _patient) public {
        patientAccessControls[_patient].patient = _patient;
    }

    modifier onlyPatient() {
        require(msg.sender == patientAccessControls[msg.sender].patient, "Only the patient can perform this action");
        _;
    }

    // Add an organization for the patient
    function addOrganizationForPatient(address _orgAddress, string memory _name, string memory _role) public onlyPatient {
        Organization memory newOrg = Organization(_name, _orgAddress, _role);
        patientOrganizations[patientAccessControls[msg.sender].patient].push(newOrg);
        emit OrganizationAdded(patientAccessControls[msg.sender].patient, _name, _orgAddress, _role);
    }

    // Get all organizations for a patient
    function getPatientOrganizations() public view onlyPatient returns (Organization[] memory) {
        return patientOrganizations[patientAccessControls[msg.sender].patient];
    }

    // Update patient data
    function updatePatientData(string memory _dataType, string memory _ipfsUri) public {
        AccessControl storage accessControl = patientAccessControls[msg.sender];

        if (bytes(accessControl.patientData[_dataType]).length == 0) {
            accessControl.dataTypes.push(_dataType);
        }
        accessControl.patientData[_dataType] = _ipfsUri;
        emit PatientDataUpdated(_dataType, _ipfsUri);
    }

    // Get the list of data types
    function getPatientDataTypes() public view returns (string[] memory) {
        return patientAccessControls[msg.sender].dataTypes;
    }

    // Get patient data URI
    function getPatientDataUri(string memory _dataType) public view returns (string memory) {
        AccessControl storage accessControl = patientAccessControls[msg.sender];

        require(accessControl.authorizedEntitiesForDataType[_dataType][msg.sender] || msg.sender == accessControl.patient, "Unauthorized access for data type");
        return accessControl.patientData[_dataType];
    }

    // Grant access to a data type
    function grantAccess(address _entity, string memory _dataType) public onlyPatient {
        patientAccessControls[msg.sender].authorizedEntitiesForDataType[_dataType][_entity] = true;
        emit AccessGranted(_entity, _dataType);
    }

    // Revoke access from a data type
    function revokeAccess(address _entity, string memory _dataType) public onlyPatient {
        patientAccessControls[msg.sender].authorizedEntitiesForDataType[_dataType][_entity] = false;
        emit AccessRevoked(_entity, _dataType);
    }

    function getOrganizationsAccessForDataType(string memory _dataType) public view returns (Organization[] memory, bool[] memory) {
        AccessControl storage accessControl = patientAccessControls[msg.sender];

        uint orgCount = patientOrganizations[accessControl.patient].length;
        Organization[] memory orgs = new Organization[](orgCount);
        bool[] memory hasAccess = new bool[](orgCount);

        for (uint i = 0; i < orgCount; i++) {
            orgs[i] = patientOrganizations[accessControl.patient][i];
            hasAccess[i] = accessControl.authorizedEntitiesForDataType[_dataType][orgs[i].orgAddress];
        }

        return (orgs, hasAccess);
    }
}
