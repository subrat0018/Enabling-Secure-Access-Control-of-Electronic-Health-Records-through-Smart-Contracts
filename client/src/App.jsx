import React from "react";
import "./styles.css";
import EnrollmentForm from "./pages/Enrollment";
import NavBar from "./components/Navbar";
import Overview from "./pages/Overview";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AccessControlPage from "./pages/AccessControlPage";
import CreateContractPage from "./pages/CreateContractPage";
import Organizations from "./pages/Organizations";


function App() {
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
      <Route path="/organizations" element={<Organizations/>}/>
    </Routes>
  </div>)
}
export default App;
