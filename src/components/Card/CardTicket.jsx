import React from "react";
import DetailSection from "../Results/DetailSection";
import ButtonSelect from "../Button/ButtonSelect";

const CardTicket = ({ ticket, isOpen, onSelect }) => {
  const {
    airline,
    classType,
    departureTime,
    departureDate,
    departureLocation,
    departureCity,
    duration,
    flightType,
    arrivalTime,
    arrivalDate,
    arrivalLocation,
    arrivalCity,
    price,
    airlineDetail,
  } = ticket;

  return (
    <div className="cardTicket w-[699px] flex flex-col bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/icons/Thumbnail.svg"
              alt="Airline Logo"
              className="w-6 h-6"
            />
            <p className="text-sm font-medium">{`${airline} - ${classType}`}</p>
          </div>
          <img
            src="/src/assets/icons/Suffix.svg"
            alt="Toggle Details"
            className="w-6 h-6 cursor-pointer"
            onClick={onSelect}
          />
        </div>

        <div className="flex gap-x-12">
          <div className="flex-1 flex gap-x-8">
            <div className="flex-1 flex items-center gap-x-4 ml-[30px]">
              <div>
                <p className="text-xl font-bold">{departureTime}</p>
                <p className="text-sm text-gray-500">{departureCity}</p>
              </div>
              <div className="text-sm text-gray-500 flex flex-col items-center flex-1">
                <p className="mb-2">{duration}</p>
                <div className="w-[233px] h-[1px] bg-gray-300"></div>
                <span className="mt-2">{flightType}</span>
              </div>

              <div>
                <p className="text-xl font-bold">{arrivalTime}</p>
                <p className="text-sm text-gray-500">{arrivalCity}</p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/icons/icon_baggage-delay.svg"
                  alt="Toggle Details"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-lg font-bold text-purple-600">{price}</p>
            <ButtonSelect />
          </div>
        </div>
      </div>

      {/* Render DetailSection jika tiket ini aktif */}
      {isOpen && (
        <DetailSection
          departureTime={departureTime}
          departureDate={departureDate}
          departureLocation={departureLocation}
          airlineDetail={airlineDetail}
          arrivalTime={arrivalTime}
          arrivalDate={arrivalDate}
          arrivalLocation={arrivalLocation}
        />
      )}
    </div>
  );
};

export default CardTicket;
