// src/pages/SignupPage.js
import React from "react";
import Signup from "../Components/Signup";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Signup navigate={navigate} />
    </div>
  );
}

export default SignupPage;
