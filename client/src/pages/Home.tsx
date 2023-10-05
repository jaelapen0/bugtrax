import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"
import Dashboard from "../pages/Dashboard"
import SplashPage from "../pages/SplashPage"

const Home = () => {
  const authContext = useContext(AuthContext);
  
  return (
  <div>
    {authContext.user? 
    useNavigate("/dashboard")
    : useNavigate("/splashpage") }
  </div>
  );
};

export default Home;
