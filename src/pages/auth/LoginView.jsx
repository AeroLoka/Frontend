import React from "react";
import Login from "../../components/Auth/Login";
import authBanner from "../../assets/images/auth-banner.png"

const LoginView = () => {
  return (
    
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="">
          <img src={authBanner} alt="" className="h-full" />
        </div>
        <Login />
      </div>
    
  );
};

export default LoginView;
