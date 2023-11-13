/* eslint-disable */
import React, { useState } from 'react';
import OverviewContract from '../contracts/OverviewContract.json';
import PatientOrgContract from '../contracts/PatientOrgContract.json';
import EnrollmentContract from '../contracts/EnrollmentContract.json';
import { Web3Context } from './index';
import Web3 from 'web3';


const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });
  const [_OverviewContract, setOverviewContract] = useState('');
  const [_PatientOrgContract, setPatientOrgContract] = useState('');
  const [_EnrollmentContract, setEnrollmentContract] = useState('');

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      // console.log('We have the ethereum object');
    }
    var web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain = await web3.eth.getChainId();
    setAccount({
      accounts: accounts,
      currentAccount: accounts[0],
    });

    if (accounts.length !== 0) {
      getContract(chain, accounts);
    } else {
      console.log('No authorized account found');
    }
  };
  const getContract = (chain, accounts) => {
    var web3 = new Web3(window.ethereum);

    const deployedNetwork = EnrollmentContract.networks[chain];

    const instance0 = new web3.eth.Contract(
        OverviewContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    
    const instance1 = new web3.eth.Contract(
        EnrollmentContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      
    const instance2 = new web3.eth.Contract(
        PatientOrgContract.abi,
        deployedNetwork && deployedNetwork.address
      );


      setOverviewContract(instance0);
      setEnrollmentContract(instance1);
      setPatientOrgContract(instance2);

  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        _OverviewContract,
        _PatientOrgContract,
        _EnrollmentContract

      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
