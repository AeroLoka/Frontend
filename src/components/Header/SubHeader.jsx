import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SubHeader = (props) => {
  const navigate = useNavigate();
  const { label, children } = props;
  const handleBeranda = () => {
    navigate("/");
  };
  return (
    <div className="shadow-md">
      <div className="max-w-7xl pl-4 mx-auto mt-32 font-bold text-xl flex">
        <p>{label}</p>
      </div>
      <div className="max-w-7xl pl-4 mx-auto py-3 px-4">
        <button
          className="flex items-center space-x-4 pl-4 text-left text-white w-full bg-purple-500 p-2 rounded-lg"
          onClick={handleBeranda}
        >
          <FaArrowLeft />
          <span>Beranda</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default SubHeader;
