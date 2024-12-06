import React from "react";
import Register from "../../components/Auth/Register";

const RegisterView = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden md:block">
          <img src="/images/AuthBanner.png" alt="" className="w-full h-screen object-cover" />
        </div>
        <div className="flex items-center justify-center">
          <Register />
        </div>
      </div>
    </>
  );
};

export default RegisterView;
