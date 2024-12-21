import React from "react";
import DetailSection from "../Results/DetailSection";
import ButtonSelect from "../Button/ButtonSelect";

const CardTicket = ({ ticket, isOpen, onSelect, onNavigate }) => {
  const {
    airline,
    airport,
    airportTerminal,
    flightNumber,
    classType,
    departureTime,
    departureCity,
    arrivalTime,
    arrivalCity,
    duration,
    departureDate,
    arrivalDate,
    price,
    airlineDetail,
  } = ticket;

  return (
        <div
      className="w-full flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-5 hover:shadow-lg hover:border-purple-500 transition-shadow mb-4 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/Thumbnail.png"
              alt="Airline Logo"
              className="w-6 h-6"
            />
            <p className="text-sm font-medium">{`${airline} - ${classType}`}</p>
          </div>
          <img
            src="/src/assets/icons/Suffix.svg"
            alt="Toggle Details"
            className="w-6 h-6 cursor-pointer hover:shadow-xl"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-x-12">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 sm:ml-8">
              <div className="flex flex-col items-center">
                <p className="text-lg sm:text-xl font-bold">{departureTime}</p>
                <p className="text-sm text-gray-500">{departureCity}</p>
              </div>

              <div className="text-sm text-gray-500 flex flex-col items-center w-full sm:w-auto">
                <p className="mb-2">{duration}</p>
                <div className="w-full sm:w-[150px] lg:w-[233px] h-[1px] bg-gray-300"></div>
                <span className="mt-2">Direct</span>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-lg sm:text-xl font-bold">{arrivalTime}</p>
                <p className="text-sm text-gray-500">{arrivalCity}</p>
              </div>

              <div className="hidden sm:flex justify-center items-center">
                <img
                  src="/src/assets/icons/icon_baggage-delay.svg"
                  alt="Baggage Info"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between sm:justify-end items-center sm:flex-col sm:items-end space-y-0 sm:space-y-2 mt-4 lg:mt-0">
            <p className="text-lg font-bold text-purple-600">{price}</p>
            <ButtonSelect onSelect={onSelect} onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      {isOpen && (
        <DetailSection
          airline={airline}
          airport={airport}
          airportTerminal={airportTerminal}
          flightNumber={flightNumber}
          classType={classType}
          departureTime={departureTime}
          departureDate={departureDate}
          departureCity={departureCity}
          arrivalTime={arrivalTime}
          arrivalDate={arrivalDate}
          arrivalCity={arrivalCity}
          airlineDetail={airlineDetail}
        />
      )}
    </div>
  );
};

export default CardTicket;
