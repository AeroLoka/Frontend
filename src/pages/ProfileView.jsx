import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SubHeader from "../components/Header/SubHeader";
import { LuPenLine } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import DetailProfile from "../components/Profile/DetailProfile";
import AccountSettings from "../components/Profile/AccountSettings";

const ProfileView = () => {
    const [activeView, setActiveView] = useState("profile");
    return (
        <>
            <Navbar />
            <SubHeader label="Akun">
            </SubHeader>
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid md:grid-cols-[35%_64%] gap-4">
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-6 flex flex-col">
                            <button
                                onClick={() => setActiveView("profile")}
                                className={`flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300 ${
                                    activeView === "profile"
                                        ? "font-bold text-purple-500"
                                        : ""
                                }`}
                            >
                                <LuPenLine />
                                <span>Ubah Profile</span>
                            </button>
                            <button
                                onClick={() => setActiveView("settings")}
                                className={`flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300 ${
                                    activeView === "settings"
                                        ? "font-bold text-purple-500"
                                        : ""
                                }`}
                            >
                                <CiSettings />
                                <span>Account Settings</span>
                            </button>
                            <button
                                className={`flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300`}
                            >
                                <RxExit />
                                <span>Logout</span>
                            </button>
                            <p className="text-center text-sm font-extralight">
                                version 1.1.0
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="border rounded-lg p-6">
                            {activeView === "profile" ? (
                                <DetailProfile />
                            ) : (
                                <AccountSettings />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileView;
