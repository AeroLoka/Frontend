import React from "react";
import Register from "../../components/Auth/Register";
import authBanner from "../../assets/images/auth-banner.png";

const RegisterView = () => {
  return (
    <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
      <div className="">
        <img src={authBanner} alt="" className="" />
      </div>
      <Register />
    </div>
  );
};

export default RegisterView;
