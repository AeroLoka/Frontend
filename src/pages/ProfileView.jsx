import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Stage from "../components/navbar/Stage";
import { LuPenLine } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";

const ProfileView = () => {
    return (
        <>
            <Navbar />
            <Stage>
                <button  className="flex items-center space-x-4 pl-4 text-left text-white w-full bg-red-500 p-2 rounded-lg">
                <FaArrowLeft />
                <span>Beranda</span>
                </button>
            </Stage>
            <div className="max-w-7xl mx-auto p-4 bg-black">
                <div className="grid md:grid-cols-[35%_64%] gap-4">
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-6 flex flex-col">
                            <button className="flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300 font-bold">
                                <LuPenLine />
                                <span>Ubah Profile</span>
                            </button>
                            <button className="flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300 font-bold">
                                <CiSettings />
                                <span>Account Settings</span>
                            </button>
                            <button className="flex items-center space-x-2 py-2 text-left w-full border-b border-gray-300 font-bold">
                                <RxExit />
                                <span>
                                    Logout
                                </span>
                            </button>
                            <p className="text-center text-sm font-extralight">version 1.1.0</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-slate-500 rounded-lg p-6">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileView;
