import React from "react";
import Login from "../../components/Auth/Login";

const LoginView = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <img src="/images/AuthBanner.png" alt="" className="w-full h-screen object-cover" />
        </div>
        <div className="flex items-center justify-center">
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginView;
