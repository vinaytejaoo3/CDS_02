import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DashboardPage from "./Pages/DashboardPage";


function App() {
  
  return (
    <Router>
      <Routes>
          
      <Route path="/" element={
        <div className='title'><center><h1>AI-Enhanced Drug Adverse Reaction Monitoring</h1></center>
        <div className="background">    
         <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '90px', border: '10px solid green', color: 'green', height:'200px',width:'200px',marginLeft:'40%',borderRadius:'20px', }}>
          <a href="Login" style={{ margin: '10px', backgroundColor: 'greenyellow', padding: '13px', borderRadius: '10px', textDecoration: 'none',marginTop:'30px' }}>Login</a>
          <a href="Signup" style={{ margin: '10px', backgroundColor: 'greenyellow', padding: '13px', borderRadius: '10px', textDecoration: 'none',marginTop:'30px' }}>SignUp</a>
        </div>
        </div>
        </div>
     } />

      <Route
          path="/login"
          element={<LoginPage />}
          style={{ marginTop: '20px' }}
      ></Route>

        <Route
          path="/signup"
          element={<SignupPage />}
        ></Route>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
