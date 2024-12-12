import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import FlightModal from "../Modals/FlightModal";
import PassengerModal from "../Modals/PassengerModal";
import SeatClassModal from "../Modals/SeatClassModal";

const SearchFlight = () => {
  const [isFlightFromModalOpen, setIsFlightFromModalOpen] = useState(false);
  const [isFlightToModalOpen, setIsFlightToModalOpen] = useState(false);
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [isSeatClassModalOpen, setIsSeatClassModalOpen] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isReturnEnabled, setIsReturnEnabled] = useState(true);
  const [seatClass, setSeatClass] = useState("");

  const [passengers, setPassengers] = useState({
    Dewasa: 0,
    Anak: 0,
    Bayi: 0,
  });
  const totalPassengers = passengers.Dewasa + passengers.Anak + passengers.Bayi;

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

  const handleToggle = () => {
    setIsReturnEnabled((prev) => !prev);
    if (!isReturnEnabled) {
      setReturnDate(null);
    }
  };

  const handlePassengerChange = (updatedPassengers) => {
    setPassengers(updatedPassengers);
    setIsPassengerModalOpen(false);
  };

  const handleSeatClassChange = (selectedClass) => {
    setSeatClass(selectedClass);
    setIsSeatClassModalOpen(false);
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
                  alt="Take Off Icon"
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">From</p>
                <input
                  id="fromFlight"
                  placeholder="Cari kota asal"
                  value={from}
                  onClick={() => openModal("from")}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
                />
              </div>
              <div className="flex justify-center">
                <button className="" onClick={handleSwitch}>
                  <img src="/icons/fi_return.svg" alt="Return Icon" />
                </button>
              </div>

              <div className="flex items-center">
                <img
                  src="/icons/fi_flight-takeoff.svg"
                  alt="Take Off Icon"
                  className="mr-2"
                />
                <p className="block mr-5 text-sm text-[#8A8A8A]">To</p>
                <input
                  id="toFlight"
                  placeholder="Cari kota tujuan"
                  value={to}
                  onClick={() => openModal("to")}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 w-full mb-5 lg:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
                <div className="flex items-center mr-6 mb-3">
                  <img
                    src="/icons/fi_date.svg"
                    alt="Date Icon"
                    className="mr-2 ml-1 w-5"
                  />
                  <p className="block text-sm text-[#8A8A8A]">Date</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-5">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Departure
                    </label>
                    <Datepicker
                      primaryColor={"purple"}
                      showShortcuts={true}
                      asSingle={true}
                      value={departureDate}
                      onChange={(date) => {
                        setDepartureDate(date);
                        if (isReturnEnabled && !returnDate) {
                          setReturnDate(date);
                        }
                      }}
                      displayFormat="DD MMMM YYYY"
                      placeholder="Pilih tanggal"
                      inputClassName="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 placeholder:text-[#7126B5] lg:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Return
                    </label>
                    <Datepicker
                      primaryColor={"purple"}
                      showShortcuts={true}
                      asSingle={true}
                      value={returnDate}
                      onChange={(date) => {
                        if (isReturnEnabled) {
                          setReturnDate(date);
                        }
                      }}
                      displayFormat="DD MMMM YYYY"
                      placeholder="Pilih tanggal"
                      disabled={!isReturnEnabled}
                      inputClassName={`w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base ${
                        isReturnEnabled
                          ? "placeholder:text-[#7126B5]"
                          : "placeholder:text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="absolute top-[48%] right-14 flex items-center justify-center ml-2 md:right-[50%]">
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
                    alt="Airlane Seat Icon"
                    className="mr-2 w-5 lg:ml-6"
                  />
                  <p className="block text-sm text-[#8A8A8A]">To</p>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col mr-5">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Passengers
                    </label>
                    <input
                      id="passengerCount"
                      value={
                        totalPassengers > 0
                          ? `${totalPassengers} Penumpang`
                          : "0 Penumpang"
                      }
                      onClick={() => openModal("passenger")}
                      readOnly
                      className={`w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base ${
                        totalPassengers > 0 ? "text-black" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm mb-1 text-[#8A8A8A] lg:text-base">
                      Seat Class
                    </label>
                    <input
                      id="seatClass"
                      value={seatClass.label}
                      onClick={() => openModal("seatclass")}
                      placeholder="Pilih seat class"
                      readOnly
                      className="w-full text-sm border-b-2 border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] p-2 lg:text-base"
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
