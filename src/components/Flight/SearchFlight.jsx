import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/"
import FlightModal from "../Modals/FlightModal";
import PassengerModal from "../Modals/PassengerModal";
import SeatClassModal from "../Modals/SeatClassModal";

const SearchFlight = () => {
  const [isFlightFromModalOpen, setIsFlightFromModalOpen] = useState(false);
  const [isFlightToModalOpen, setIsFlightToModalOpen] = useState(false);

  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState(false);

  const openModal = (modal) => {
    if (modal === "from") {
      setIsFlightFromModalOpen(true);
    } else if (modal === "to") {
      setIsFlightToModalOpen(true);
    } else if (modal === "passenger") {
      setIsPassengerModalOpen(true);
    } else if (modal === "seatclass") {
      setIsSeatClassModalOpen(true);
    }
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSwitch = (e) => {
    e.preventDefault();
    setFrom(to);
    setTo(from);
  };

  const handleSelectLocation = (location, type) => {
    if (type === "from") {
      setFrom(location);
      setIsFlightFromModalOpen(false);
    } else if (type === "to") {
      setTo(location);
      setIsFlightToModalOpen(false);
    }
  };

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isReturnEnabled, setIsReturnEnabled] = useState(true);

  const handleToggle = () => {
    setIsReturnEnabled((prevState) => !prevState);
  };

  const [passengers, setPassengers] = useState({
    Dewasa: 0,
    Anak: 0,
    Bayi: 0,
  });

  const totalPassengers = passengers.Dewasa + passengers.Anak + passengers.Bayi;

  const handlePassengerChange = (updatedPassengers) => {
    setPassengers(updatedPassengers);
    closeModal();
  };

  const [seatClass, setSeatClass] = useState("");

  const handleSeatClassChange = (selectedClass) => {
    setSeatClass(selectedClass);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchFlight = {
      from,
      to,
      departureDate,
      returnDate: isReturnEnabled ? returnDate : null,
      passengers,
      seatClass,
    };
    console.log("Data untuk search ticket: ", searchFlight);
  };

  return (
    <div>
      <FlightModal
        isOpen={isFlightFromModalOpen}
        onClose={() => setIsFlightFromModalOpen(false)}
        onSelectFlight={(location) => handleSelectLocation(location, "from")}
        label="From"
        fromLocation={to}
      />

      <FlightModal
        isOpen={isFlightToModalOpen}
        onClose={() => setIsFlightToModalOpen(false)}
        onSelectFlight={(location) => handleSelectLocation(location, "to")}
        label="to"
        toLocation={to}
      />

      <PassengerModal
        isOpen={isPassengerModalOpen}
        onClose={() => setIsPassengerModalOpen(false)}
        onPassengerChange={handlePassengerChange}
        passengers={passengers}
      />

      <SeatClassModal
        isOpen={isSeatClassModalOpen}
        onClose={() => setIsSeatClassModalOpen(false)}
        onSeatClassChange={handleSeatClassChange}
      />

      <div className="absolute top-64 right-1 left-1 z-10 lg:top-80 lg:mt-3">
        <div className="p-4 mx-8 bg-white rounded-xl shadow-xl border border-gray-300 md:mx-56">
          <h2 className="text-xl font-bold py-3 lg:px-1">
            Pilih Jadwal Penerbangan spesial di
            <span className="text-[#7126B5]"> Tiketku!</span>
          </h2>
          <form action="" onSubmit={handleSearch}>
            <div className="grid grid-cols-1 gap-4 w-full items-center mb-5 lg:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">From</p>
                <input
                  id="fromFlight"
                  type="text"
                  value={from}
                  onClick={() => openModal("from")}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                />
              </div>
              <div className="flex justify-center">
                <button className="" onClick={handleSwitch}>
                  <img src="/icons/fi_return.svg" alt="" />
                </button>
              </div>

              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt=""
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">To</p>
                <input
                  id="toFlight"
                  type="text"
                  value={to}
                  onClick={() => openModal("to")}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full mb-5 lg:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
                <div className="flex items-center mr-6 mb-3">
                  <img
                    src="/icons/fi_date.svg"
                    alt=""
                    className="mr-2 ml-1 w-5"
                  />
                  <p className="block text-sm text-[#8A8A8A]">Date</p>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-[1fr_1fr_auto]">
                  <div className="flex flex-col mr-5">
                    <label htmlFor="" className="text-base mb-1 text-[#8A8A8A]">
                      Departure
                    </label>
                    {/* <input
                      id="departureDate"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    /> */}
                    <DatePicker
                      selected={departureDate}
                      onChange={(date) => setDepartureDate(date)}
                      dateFormat="dd MMMM yyyy"
                      placeholderText="Pilih tanggal"
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-base mb-1 text-[#8A8A8A]">
                      Return
                    </label>
                    {/* <input
                      id="returnDate"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      disabled={!isReturnEnabled}
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    /> */}
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      dateFormat="dd MMMM yyyy"
                      placeholderText="Pilih tanggal"
                      disabled={!isReturnEnabled}
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5]"
                    />
                  </div>
                  <div className="flex items-center justify-center ml-2">
                    <div
                      className={`w-[40px] h-[24px] bg-[#4B1979] rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-xl ${
                        isReturnEnabled ? "bg-[#4B1979]" : "bg-gray-300"
                      }`}
                      onClick={handleToggle}
                      aria-checked={isReturnEnabled}
                    >
                      <div
                        className={`w-[20px] h-[20px] bg-white rounded-full shadow-xl transition-all duration-300 ease-in-out transform ${
                          isReturnEnabled
                            ? "translate-x-[16px] translate-y-0.5"
                            : "translate-x-[4px] translate-y-0.5"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
                <div className="flex items-center mr-6 mb-3">
                  <img
                    src="/icons/fi_airlane-seat.svg"
                    alt=""
                    className="mr-2 w-5 lg:ml-6"
                  />
                  <p className="block text-sm text-[#8A8A8A]">To</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-5">
                    <label
                      htmlFor="passengerCount"
                      className="text-base mb-1 text-[#8A8A8A]"
                    >
                      Passengers
                    </label>
                    <input
                      id="passengerCount"
                      type="text"
                      value={`${totalPassengers} Penumpang`}
                      onClick={() => openModal("passenger")}
                      readOnly
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="seatClass"
                      className="text-base mb-1 text-[#8A8A8A]"
                    >
                      Seat Class
                    </label>
                    <input
                      id="seatClass"
                      type="text"
                      value={seatClass.label}
                      onClick={() => openModal("seatclass")}
                      readOnly
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[48px] rounded-xl text-[16px] font-bold text-center text-white bg-[#7126B5] hover:bg-purple-900"
            >
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
