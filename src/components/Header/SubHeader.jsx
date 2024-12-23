import React, { useState } from "react";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiCheckDoubleLine } from "react-icons/ri";

const SubHeader = ({ label, children, onMarkAllRead, onSearch, searchQuery: externalSearchQuery }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");

  const handleBeranda = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      onSearch("");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="shadow-md">
      <div className="max-w-7xl pl-4 mx-auto mt-32 font-bold text-xl flex items-center">
        <p>{label}</p>
      </div>

      <div className="max-w-7xl pl-4 mx-auto py-3 px-4">
        <div className="flex items-center space-x-2">
          {!isSearchOpen ? (
            <>
              <button
                className="flex-1 flex items-center space-x-4 text-white bg-purple-500 p-2 rounded-lg"
                onClick={handleBeranda}
              >
                <FaArrowLeft />
                <span>Beranda</span>
              </button>
              {label === "Notifikasi" && (
                <div className="flex items-center space-x-2 gap-4">
                  <button 
                    className="scale-150 ml-2 p-1 rounded-3xl text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                    onClick={onMarkAllRead}
                    title="Mark all as read"
                  >
                    <RiCheckDoubleLine />
                  </button>
                  <button
                    onClick={handleSearchClick}
                    className="p-2 rounded-full hover:bg-purple-100 transition-colors"
                    title="Search notifications"
                  >
                    <FaSearch className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search notifications..."
                  className="w-full p-2 pr-10 rounded-lg border border-purple-300 focus:outline-none focus:border-purple-500"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      onSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearchClick}
                className="p-2 text-purple-600 hover:text-purple-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default SubHeader;