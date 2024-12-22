import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalDateFilter = ({
  isOpen,
  onClose,
  onSelectDate,
  startDate,
  endDate,
  selectsRange
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onSelectDate([null, null]); // Reset both start and end dates to null
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg min-w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Pilih Tanggal</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <DatePicker
          selected={startDate}
          onChange={onSelectDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange={true}
          inline
          monthsShown={2}
          dateFormat="dd/MM/yyyy"
          minDate={undefined}
          className="w-full"
        />
        
        <div className="mt-4 flex justify-between space-x-2">
          {/* Reset button added to the left */}
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
          
          {/* Right-aligned buttons in their own container */}
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (startDate && endDate) {
                  onClose();
                }
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDateFilter;