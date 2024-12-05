import React, { useEffect } from "react";
import authBanner from "../../assets/images/auth-banner.png";
import logo from "../../assets/images/logo.png";

const AuthLayout = (props) => {
    const { title, children } = props;
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center min-h-screen w-full overflow-hidden">
            <div className="hidden lg:block h-screen bg-purple-100 relative">
                <img
                    src={authBanner}
                    alt="Auth Banner"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="bg-white mx-auto p-6">
                <div className="lg:hidden flex justify-center mb-10">
                    <img
                        src={logo}
                        alt="logo aeroloka.png"
                        className="w-[50vw]"
                    />
                </div>
                <h2 className="font-bold text-xl mb-4">{title}</h2>
                <div className="w-[60vw] lg:w-[30vw]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
