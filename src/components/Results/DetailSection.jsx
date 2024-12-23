import React from "react";

const DetailSection = ({
  airline,
  airport,
  airportTerminal,
  flightNumber,
  classType,
  departureTime,
  departureDate,
  arrivalTime,
  arrivalDate,
  arrivalCity,
  airlineDetail,
}) => {
  return (
    <div className="flex flex-col bg-white p-3 sm:p-4 gap-3 sm:gap-4 w-full">
    <div className="border-t border-gray-300 w-full my-3"></div>
    
    <p className="font-bold text-sm sm:text-base text-[#6B21A8] font-poppins">
      Detail Penerbangan
    </p>

    {/* Departure Section */}
    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
      <div className="flex flex-col">
        <p className="font-bold text-lg sm:text-xl leading-tight">{departureTime}</p>
        <p className="font-normal text-sm sm:text-base leading-tight">
          {departureDate}
        </p>
        <p className="font-medium text-sm sm:text-base leading-tight">
          {airport} - Terminal {airportTerminal}
        </p>
      </div>
      <p className="font-bold text-xs sm:text-sm text-[#6C3DAB]">
        Keberangkatan
      </p>
    </div>

    <div className="border-t border-gray-300 w-full my-3"></div>

    {/* Flight Details Section */}
    <div className="flex items-start gap-2 sm:gap-3">
      <img
        src="/icons/Thumbnail.svg"
        alt="Airline Logo"
        className="w-6 h-6 mt-1"
      />
      <div className="flex-1">
        <p className="font-bold text-sm sm:text-base">
          {airline} - {classType}
        </p>
        <p className="font-bold text-sm sm:text-base">
          {airline} - A0{flightNumber}
        </p>
        
        <div className="mt-4">
          <p className="font-bold text-sm sm:text-base mb-2">Informasi:</p>
          <ul className="space-y-1 text-sm sm:text-base">
            <li>Baggage 20 kg</li>
            <li>Cabin baggage 7 kg</li>
            <li className="break-words">{airlineDetail}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-300 w-full my-3"></div>

    {/* Arrival Section */}
    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
      <div className="flex flex-col">
        <p className="font-bold text-lg sm:text-xl leading-tight">{arrivalTime}</p>
        <p className="font-normal text-sm sm:text-base leading-tight">
          {arrivalDate}
        </p>
        <p className="font-medium text-sm sm:text-base leading-tight">
          {arrivalCity}
        </p>
      </div>
      <p className="font-bold text-xs sm:text-sm text-[#6C3DAB]">
        Kedatangan
      </p>
    </div>
  </div>
);
};

export default DetailSection;
