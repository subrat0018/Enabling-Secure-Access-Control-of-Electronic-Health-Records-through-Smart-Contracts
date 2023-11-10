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

function App() {
  return(
  <div className="flex-col space-y-24">
    <NavBar/>
    <Routes>
      {/* <Route path="/" element={<Home/>}/>
      <Route path="/enroll" element={<EnrollmentForm/>}/> */}
      {/* <Route path="/" element={<Overview/>}/> */}
      {/* <Route path="/" element={<Dashboard/>}/> */}
      {/* <Route path="/" element={<AccessControlPage/>}/> */}
      <Route path="/" element={<CreateContractPage/>}/>
    </Routes>
  </div>)
}

export default App;
