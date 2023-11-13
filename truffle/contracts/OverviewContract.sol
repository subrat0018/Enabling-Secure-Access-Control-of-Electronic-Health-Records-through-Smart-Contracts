// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// This contract manages an overview of patient data in a healthcare blockchain system.
contract OverviewContract {
    // Struct representing a summary of a patient's healthcare records.
    struct PatientSummary {
        address[] pocAddresses; // Array of addresses for Patient Organization Contracts (POCs) associated with the patient.
        string[] pocNames;
        string status; // Current status of the patient, could represent health or administrative status.
    }

    // Mapping of patient Ethereum addresses to their respective PatientSummary.
    mapping(address => PatientSummary) public patientSummaries;

    // Function to add a new Patient Organization Contract (POC) address to a patient's summary.
    // _patientAddress: Ethereum address of the patient.
    // _pocAddress: Ethereum address of the Patient Org Contract to be added.
    function addPOC(address _patientAddress,string memory _name, address _pocAddress) public {
        patientSummaries[_patientAddress].pocAddresses.push(_pocAddress);
        patientSummaries[_patientAddress].pocNames.push(_name);
    }

    // Function to update the status of a patient.
    // _patientAddress: Ethereum address of the patient.
    // _status: New status to be updated for the patient.
    function updatePatientStatus(address _patientAddress, string memory _status) public {
        patientSummaries[_patientAddress].status = _status;
    }

    // Function to retrieve a patient's summary.
    // _patientAddress: Ethereum address of the patient.
    // Returns the PatientSummary struct for the given patient address.
    function getPatientSummary(address _patientAddress) public view returns (PatientSummary memory) {
        return patientSummaries[_patientAddress];
    }
}
