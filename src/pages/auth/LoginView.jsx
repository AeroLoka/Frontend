import React from "react";
import Login from "../../components/Auth/Login";
import AuthLayout from "../../components/Auth/AuthLayout";
import TitleOfPage from "../../components/Title/TitleOfPage";

const LoginView = () => {
    TitleOfPage("Aeroloka - Login");

    return (
        <>
            <AuthLayout title="Masuk">
                <Login />
            </AuthLayout>
        </>
    );
};

export default LoginView;
