import { useState } from "react";

const PassengerModal = ({ isOpen, onClose, passengers, onPassengerChange }) => {
  const handleIncrement = (type) => {
    onPassengerChange({
      ...passengers,
      [type]: passengers[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (passengers[type] > 0) {
      onPassengerChange({
        ...passengers,
        [type]: passengers[type] - 1,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-[400px] h-[305px] bg-white p-6 rounded-lg shadow-xl">
        <button className="w-full pb-5 flex justify-end">
          <img onClick={onClose} src="/icons/fi_close.svg" alt="" />
        </button>
        <div className="space-y-4">
          {["Dewasa", "Anak", "Bayi"].map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <h3 className="capitalize font-bold">{type}</h3>
                <p className="text-sm">(12 tahun keatas)</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleDecrement(type)}
                  className="w-10 h-10 bg-white rounded-md flex justify-center items-center border border-[#7126B5]"
                >
                  <img src="/icons/fi_decrement.svg" alt="" />
                </button>
                <span className="w-14 h-10 text-center flex items-center justify-center rounded-md border border-[#D0D0D0]">
                  {passengers[type]}
                </span>
                <button
                  onClick={() => handleIncrement(type)}
                  className="w-10 h-10 bg-white rounded-md flex justify-center items-center border border-[#7126B5]"
                >
                  <img src="/icons/fi_increment.svg" alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            // onClick={() => onChangePassengers(passengers)}
            onClick={(console.log(passengers), onClose)}
            className="w-[150px] p-3 py-2 bg-[#4B1979] text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;
