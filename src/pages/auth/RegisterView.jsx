import React from "react";
import Register from "../../components/Auth/Register";
import AuthLayout from "../../components/Auth/AuthLayout";
import TitleOfPage from "../../components/Title/TitleOfPage";

const RegisterView = () => {
  TitleOfPage("Aeroloka - Register");

  return (
    <>
      <AuthLayout title="Daftar">
        <Register />
      </AuthLayout>
    </>
  );
};

export default RegisterView;
