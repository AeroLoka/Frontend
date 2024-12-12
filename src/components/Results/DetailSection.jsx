import React from "react";

const DetailSection = ({
  departureTime,
  departureDate,
  departureLocation,
  airlineDetail,
  arrivalTime,
  arrivalDate,
  arrivalLocation,
}) => {
  return (
    <div
      className="flex flex-col bg-white p-[10px] gap-[12px] overflow-hidden"
      style={{ minWidth: "625px", minHeight: "364px" }}
    >
      <div className="border-t border-gray-300 w-full my-[12px]"></div>
      <p className="font-bold text-[14px] leading-[20px] text-[#6B21A8] font-poppins">
        Detail Penerbangan
      </p>

      {/* Departure Section */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-xl leading-[24px]">{departureTime}</p>
          <p className="font-normal text-[14px] leading-[20px]">
            {departureDate}
          </p>
          <p className="font-medium text-[14px] leading-[20px]">
            {departureLocation}
          </p>
        </div>
        <p className="font-bold text-[12px] leading-[18px] text-[#6C3DAB] text-right">
          Keberangkatan
        </p>
      </div>
      <div className="border-t border-gray-300 w-full my-[12px]"></div>

      {/* Airline Section */}
      <div>
        <div className="flex items-center gap-[8px] mt-[12px]">
          <img
            src="/icons/Thumbnail.svg"
            alt="Airline Logo"
            className="w-6 h-6"
          />
          <div>
            <p className="font-bold text-[14px] leading-[20px]">
              {airlineDetail}
            </p>
            <br />
            <p className="font-bold text-[14px] leading-[20px]">Informasi:</p>
            <ul className="font-normal text-[14px] leading-[20px]">
              <li>Baggage 20 kg</li>
              <li>Cabin baggage 7 kg</li>
              <li>In Flight Entertainment</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 w-full my-[12px]"></div>

      {/* Arrival Section */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-xl leading-[24px]">{arrivalTime}</p>
          <p className="font-normal text-[14px] leading-[20px]">
            {arrivalDate}
          </p>
          <p className="font-medium text-[14px] leading-[20px]">
            {arrivalLocation}
          </p>
        </div>
        <p className="font-bold text-[12px] leading-[18px] text-[#6C3DAB] text-right">
          Kedatangan
        </p>
      </div>
    </div>
  );
};

export default DetailSection;
