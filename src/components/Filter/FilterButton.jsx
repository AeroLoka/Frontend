import React, { useState } from "react";

const FilterButton = ({ setFilteredData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Harga - Termurah");

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const applyFilter = () => {
    // Contoh pengiriman data filter ke parent atau API
    setFilteredData(selectedFilter);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto mt-5 flex items-center justify-end mb-7 px-4">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus:outline-none bg-purple-400 focus:ring-4 focus:ring-purple-400 text-white shadow-lg shadow-purple-500/50 hover:bg-violet-600 hover:text-white h-9 px-4 py-2 rounded-full bg-primaryPurple"
        type="button"
        onClick={handleModalToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-down w-5 h-5 mr-2"
        >
          <path d="m21 16-4 4-4-4"></path>
          <path d="M17 20V4"></path>
          <path d="m3 8 4-4 4 4"></path>
          <path d="M7 4v16"></path>
        </svg>
        <span className="text-sm font-medium leading-none cursor-pointer">
          Filter
        </span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-4 shadow-lg">
            <h3 className="text-lg font-bold text-purple-600 mb-4">
              Pilih Filter
            </h3>
            <ul>
              {[
                "Harga - Termurah",
                "Durasi - Terpendek",
                "Keberangkatan - Paling Awal",
                "Keberangkatan - Paling Akhir",
                "Kedatangan - Paling Awal",
                "Kedatangan - Paling Akhir",
              ].map((option) => (
                <li
                  key={option}
                  className={`p-2 rounded cursor-pointer ${
                    selectedFilter === option
                      ? "bg-purple-200 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFilter(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleModalToggle}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                onClick={applyFilter}
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
