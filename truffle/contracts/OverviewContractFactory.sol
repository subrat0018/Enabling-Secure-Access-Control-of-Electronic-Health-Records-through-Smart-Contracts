// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Import the OverviewContract
import "./OverviewContract.sol";

// Factory contract for creating new OverviewContracts
contract OverviewContractFactory {
    // Event to emit when a new OverviewContract is created
    event OverviewContractCreated(address indexed patientAddress, address overviewContractAddress);

    // Mapping to keep track of each patient's OverviewContract address
    mapping(address => address) public overviewContracts;

    // Function to create a new OverviewContract for a patient
    function createOverviewContract(address _patientAddress) public {
        // Ensure that each patient only has one OverviewContract
        require(overviewContracts[_patientAddress] == address(0), "OverviewContract already exists for this patient");

        // Create a new OverviewContract
        OverviewContract newContract = new OverviewContract();

        // Store the new contract's address in the mapping
        overviewContracts[_patientAddress] = address(newContract);

        // Emit the event
        emit OverviewContractCreated(_patientAddress, address(newContract));
    }

    // Function to retrieve the address of a patient's OverviewContract
    function getOverviewContract(address _patientAddress) public view returns (address) {
        return overviewContracts[_patientAddress];
    }
}
