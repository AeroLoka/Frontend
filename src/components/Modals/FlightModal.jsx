import React, { useState } from "react";
import searchButton from "../../assets/icons/fi_search.svg";

const FlightModal = ({ isOpen, onClose, onSelectFlight }) => {
  const [locations, setLocations] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
  ]);

  const [searchTerm, setSearchTerm] = useState("");

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
    setSearchTerm("");
    onClose();
  };

  const removeLocation = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-[700px] h-[300px] bg-white p-6 rounded-lg shadow-xl">
        <div className="relative w-full flex mb-4">
          <button>
            <img
              src={searchButton}
              alt=""
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
            className="w-full h-[40px] py-5 pl-12 mr-5 rounded-lg border border-[#D0D0D0] focus:outline-none focus:border-[#7126B5]"
          />
          <button onClick={onClose} className="text-gray-600 text-lg font-bold">
            <img src="/icons/fi_close.svg" alt="" />
          </button>
        </div>

        <div className="w-full p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold mb-4">Pencarian terkini</h2>
            <p
              onClick={() => setLocations([])}
              className="text-red-500 font-medium"
            >
              Hapus
            </p>
          </div>

          <ul className="space-y-2 h-[130px] overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleSearch(location)}
                  className="w-full flex justify-between items-center cursor-pointer pb-3 pr-2 border-b-2 border-[#D0D0D0] focus:outline-none hover:border-[#7126B5]"
                >
                  <span>{location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocation(index);
                    }}
                    className=""
                  >
                    <img src="/icons/fi_close.svg" alt="" className="w-3 h-3" />
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
