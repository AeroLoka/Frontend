import React from "react";
import Login from "../../components/Auth/Login";
import authBanner from "../../assets/images/auth-banner.png";

const LoginView = () => {
  return (
    <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
      <div className="hidden md:block">
        <img src={authBanner} alt="" className="" />
      </div>
      <Login />
    </div>
  );
};

export default LoginView;
