import { useState } from "react";
import FlightModal from "../Modals/FlightModal";
import PassengerModal from "../Modals/PassengerModal";
import SeatClassModal from "../Modals/SeatClassModal";

const SearchFlight = () => {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState("false");

  const openModal = (modal) => {
    if (modal === "from" || modal === "to") {
      setIsFlightModalOpen(true);
    } else if (modal === "passenger") {
      setIsPassengerModalOpen(true);
    } else if (modal === "seatclass") {
      setIsSeatClassModalOpen(true);
    }
  };

  return (
    <div>
      <FlightModal
      isOpen={isFlightModalOpen}
      onClose={() => setIsFlightModalOpen(false)}
      />

      <PassengerModal
      isOpen={isPassengerModalOpen}
      onClose={() => setIsPassengerModalOpen(false)}
      />

      <SeatClassModal
      isOpen={isSeatClassModalOpen}
      onClose={() => setIsSeatClassModalOpen(false)}
      />

      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative w-[968px] h-[298px] mx-auto bg-white rounded-xl shadow-xl border border-gray-300 ">
          <h2 className="text-xl font-bold p-6">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#7126B5]"> Tiketku!</span>
          </h2>
          <form action="">
            <div className="grid grid-cols-2 px-5 gap-16 w-full">
              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="block mr-5 text-sm">From</p>
                <input
                  type="text"
                  onClick={() => openModal("from")}
                  className="w-full border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="block mr-5 text-sm">To</p>
                <input
                  type="text"
                  onClick={() => openModal("to")}
                  className="w-full border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 p-5 gap-16 w-full">
              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <div className="flex items-center mr-8">
                    <img src="/icons/fi_date.svg" alt="" className="mr-2" />
                    <p className="block mr-5 text-sm">Date</p>
                  </div>
                  <div className="flex flex-col mr-5">
                    <label htmlFor="" className="text-base mb-1">
                      Departure
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-base mb-1">
                      Return
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <div className="flex items-center mr-8">
                    <img
                      src="/icons/fi_airlane-seat.svg"
                      alt=""
                      className="mr-2"
                    />
                    <p className="block mr-5 text-sm">To</p>
                  </div>
                  <div className="flex flex-col mr-5">
                    <label htmlFor="" className="text-base mb-1">
                      Passengers
                    </label>
                    <input
                      type="text"
                      onClick={() => openModal("passenger")}
                      className="w-[167px] text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-base mb-1">
                      Seat Class
                    </label>
                    <input
                      type="text"
                      onClick={() => openModal("seatclass")}
                      className="w-[167px] text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="absolute bottom-0 w-full h-[48px] rounded-bl-xl rounded-br-xl text-[16px] font-bold text-center text-white bg-[#7126B5] hover:bg-purple-900">
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
