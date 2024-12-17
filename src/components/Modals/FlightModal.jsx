import { current } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";

const FlightModal = ({ isOpen, onClose, onSelectFlight, currentLocation }) => {
  const [searchTerm, setSearchTerm] = useState(currentLocation || "");
  const modalRef = useRef(null);

  const [locations, setLocations] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
  ]);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!searchTerm) return;
    const existingIndex = locations.findIndex(
      (location) => location.toLowerCase() === searchTerm.toLowerCase()
    );
    let updatedLocations = [...locations];
    if (existingIndex !== -1) {
      updatedLocations.splice(existingIndex, 1);
    }
    updatedLocations = [searchTerm, ...updatedLocations];
    setLocations(updatedLocations);
    onSelectFlight(searchTerm);
    onClose();
  };

  const removeLocation = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleLocationSelect = (location) => {
    setSearchTerm(location);
    onSelectFlight(location);
    onClose();
  };

  useEffect(() => {
    if(isOpen) {
      setSearchTerm(currentLocation || "");
    }
  }, [isOpen, currentLocation]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div
        ref={modalRef}
        className="w-[90%] min-h-[350px] bg-white p-6 rounded-lg shadow-xl lg:w-[50%]"
      >
        <div className="relative w-full flex mb-4">
          <button>
            <img
              src="/icons/fi_search.svg"
              alt="Search Butoon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </button>
          <input
            type="text"
            placeholder="Masukkan Kota atau Negara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full h-[40px] py-5 pl-12 mr-5 cursor-pointer rounded-lg border border-[#D0D0D0] focus:outline-none focus:border-[#7126B5]"
          />
          <button onClick={onClose} className="text-gray-600 text-lg font-bold">
            <img src="/icons/fi_close.svg" alt="Close Button" />
          </button>
        </div>

        <div className="w-full p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold mb-4">Pencarian terkini</h2>
            <p
              onClick={() => setLocations([])}
              className="text-red-500 font-medium cursor-pointer"
            >
              Hapus
            </p>
          </div>

          <ul className="space-y-1 h-[180px] overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleLocationSelect(location)
                  }}
                  className="w-full flex justify-between items-center cursor-pointer p-3 border border-[#E2D4F0] rounded-lg focus:outline-none hover:bg-[#E2D4F0]"
                >
                  <span>{location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocation(index);
                    }}
                  >
                    <img
                      src="/icons/fi_close.svg"
                      alt="Close Button"
                      className="w-3 h-3"
                    />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Tidak ada lokasi yang cocok</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlightModal;
