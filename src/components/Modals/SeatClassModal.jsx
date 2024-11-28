import { useState } from "react";

const SeatClassModal = ({ isOpen, onClose }) => {
  const seatClasses = [
    { label: "Economy", price: 4950000 },
    { label: "Premium Economy", price: 7550000 },
    { label: "Business", price: 29220000 },
    { label: "First Class", price: 87620000 },
  ];

  const [selectSeatClass, setSelectSeatClass] = useState(null);

  const handleSeatClass = (seatClass) => {
    setSelectSeatClass(seatClass);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-[400px] h-[375px] bg-white p-6 rounded-lg shadow-xl">
        <button className="w-full pb-5 flex justify-end">
          <img onClick={onClose} src="/icons/fi_close.svg" alt="" />
        </button>
        <div className="flex flex-col items-center justify-center">
          {seatClasses.map((seatClass) => {
            return (
              <div
                key={seatClass.label}
                className={`w-full h-[60px] flex flex-col justify-center p-3 text-sm rounded-md cursor-pointer hover:bg-[#4B1979] hover:text-white ${
                  selectSeatClass?.label === seatClass.label
                }`}
                onClick={() => handleSeatClass(seatClass)}
              >
                <div>
                  <h3 className="font-bold">{seatClass.label}</h3>
                  <p>IDR {seatClass.price.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  {selectSeatClass?.label === seatClass.label && (
                    <img src="/icons/fi_check.svg" alt="" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectSeatClass && (
          <div className="text-[#4B1979]">
            <p>{selectSeatClass.label}</p>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-[150px] p-3 py-2 bg-[#4B1979] text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatClassModal;
