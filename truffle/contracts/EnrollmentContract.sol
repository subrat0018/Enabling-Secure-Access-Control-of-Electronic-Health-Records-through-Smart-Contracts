// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Contract for managing the enrollment of patients in a blockchain-based Electronic Health Record (EHR) system.
contract EnrollmentContract {
    // A struct to store information about a patient.
    struct Patient {
        string name; // Name of the patient.
        address patientAddress; // Ethereum address of the patient. This acts as a unique identifier.
        uint256 aadharNumber; // Aadhar number of the patient.
    }

    // A mapping from an Ethereum address to a Patient struct, used to store patient data.
    mapping(address => Patient) public patients;

    // Function to enroll a new patient in the system.
    // _name: Name of the patient.
    // _patientAddress: Ethereum address of the patient.
    // _aadharNumber: Aadhar number of the patient.
    function enrollPatient(string memory _name, address _patientAddress, uint256 _aadharNumber) public {
        // Create a new Patient struct and store it in the mapping.
        patients[_patientAddress] = Patient(_name, _patientAddress, _aadharNumber);
    }

    // Function to retrieve patient information.
    // _patientAddress: Ethereum address of the patient.
    // Returns a Patient struct containing the patient's information.
    function getPatient(address _patientAddress) public view returns (Patient memory) {
        // Return the patient data from the mapping.
        return patients[_patientAddress];
    }
}
