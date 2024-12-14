import React from "react";
import DetailSection from "../Results/DetailSection";
import ButtonSelect from "../Button/ButtonSelect";

const CardTicket = ({ ticket, isOpen, onSelect }) => {
  const {
    airlines,
    class: classType,
    departure,
    return: returnTime,
    price,
    duration,
    cities,
  } = ticket;

  const airlineName = airlines[0]?.name || "Unknown Airline";
  const departureCode = cities[0]?.shortname || "N/A";
  const arrivalCity = ticket.destinationCityId
    ? `City ${ticket.destinationCityId}`
    : "Unknown City";

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

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
            <p className="text-sm font-medium">{`${airlineName} - ${classType}`}</p>
          </div>

          <img
            src="/src/assets/icons/Suffix.svg"
            alt="Toggle Details"
            className="w-6 h-6 cursor-pointer"
            onClick={onSelect}
          />
        </div>

        <div className="flex gap-x-12">
          <div className="flex-1 flex gap-x-4">
            <div className="flex-1 flex items-center gap-x-4 ml-[10px]">
              <div>
                <p className="font-bold text-xl">{formatTime(departure)}</p>
                <p className="text-sm text-gray-500">{departureCode}</p>
              </div>
              <div className="text-sm text-gray-500 flex flex-col items-center flex-1">
                <p className="mb-2">{`${duration} minutes`}</p>
                <div className="w-[233px] h-[1px] bg-gray-300"></div>
                {/* <span className="mt-2">{flightType}</span> */}
              </div>

              <div>
                <p className="text-xl font-bold">{formatTime(returnTime)}</p>
                <p className="text-sm text-gray-500">{arrivalCity}</p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="/src/assets/icons/icon_baggage-delay.svg"
                  alt="Baggage Delay Icon"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className="text-lg font-bold text-purple-600">
              Rp {price.toLocaleString()}
            </p>
            <ButtonSelect />
          </div>
        </div>
      </div>

      {/* Render DetailSection jika tiket ini aktif */}
      {isOpen && (
        <DetailSection
          departure={ticket.departure}
          returnTime={ticket.return}
          departureCity={ticket.cities[0]?.fullname}
          departureAirport={ticket.airports[0]?.name}
          airline={ticket.airlines[0]?.name}
          destinationCity={`City ${ticket.destinationCityId}`}
          destinationAirport={"Bandara Tujuan"} // Sesuaikan jika ada data spesifik
        />
      )}
    </div>
  );
};

export default CardTicket;
