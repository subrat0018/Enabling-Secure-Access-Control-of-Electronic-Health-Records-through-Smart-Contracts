import React,{useContext,useEffect} from "react";
import "./styles.css";
import EnrollmentForm from "./pages/Enrollment";
import NavBar from "./components/Navbar";
import Overview from "./pages/Overview";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AccessControlPage from "./pages/AccessControlPage";
import CreateContractPage from "./pages/CreateContractPage";
import Web3Context from "./contexts";


function App() {
  window.ethereum&&window.ethereum.on('accountsChanged', function (accounts) {
    setTimeout(window.location.reload(false), 1000);
  });
  const { checkIfWalletIsConnected } = useContext(Web3Context);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return(
  <div className="flex-col space-y-24">
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/enroll" element={<EnrollmentForm/>}/>
      <Route path="/overview" element={<Overview/>}/> 
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/access-control" element={<AccessControlPage/>}/>
      <Route path="/create-contract" element={<CreateContractPage/>}/>
    </Routes>
  </div>)
}

export default App;
