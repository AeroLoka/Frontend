import React from "react";
import PropTypes from "prop-types";
import PaidButton from "../Button/PaidButton";

const OrderCard = ({ booking }) => {
  const {
    flight,
    bookingDate,
    totalPrice,
    totalPassenger,
    status,
    bookingCode,
  } = booking;

  const {
    departure,
    return: returnTime,
    originCity,
    destinationCity,
    class: flightClass,
  } = flight;

  const buttonType =
    status === "issued"
      ? "issued"
      : status === "unpaid"
      ? "unpaid"
      : "cancelled";

  return (
    <div className="w-[568px] p-6 border-2 hover:border-[#7126B5BF] rounded-lg flex flex-col justify-between items-center active:border-[#7126B5BF] bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow">
      {/* Status Button */}
      <div className="self-start">
        <PaidButton type={buttonType}>{status}</PaidButton>
      </div>

      {/* Route Section */}
      <div className="w-full h-auto border-b-[1px] border-gray-300 p-[16px] flex gap-[16px]">
        <div className="flex flex-1 gap-[8px] items-center">
          {/* Departure Section */}
          <div className="flex flex-col items-center">
            <p className="font-bold text-[14px] leading-[20px]">
              {originCity.fullname}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {new Date(departure).toLocaleDateString()}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {new Date(departure).toLocaleTimeString()}
            </p>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center">
            <div className="w-[233px] h-[1px] bg-gray-300 mb-1"></div>
            <p className="text-xs text-gray-500">Flight</p>
          </div>

          {/* Arrival Section */}
          <div className="flex flex-col items-center">
            <p className="font-bold text-[14px] leading-[20px]">
              {destinationCity.fullname}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {new Date(returnTime).toLocaleDateString()}
            </p>
            <p className="font-medium text-[12px] leading-[18px]">
              {new Date(returnTime).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-4 border-gray-300 pt-2 pb-2 flex justify-between items-center w-full gap-[8px]">
        <div className="text-sm">
          <p className="font-bold text-[14px] leading-[20px] ">Booking Code:</p>
          <p className="font-medium text-[14px] leading-[20px]">
            {bookingCode}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-[14px] leading-[20px] ">Class:</p>
          <p className="font-medium text-[14px] leading-[20px]">
            {flightClass}
          </p>
        </div>
        <p className="text-[#7126B5] font-bold text-lg">{`IDR ${totalPrice.toLocaleString()}`}</p>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  booking: PropTypes.shape({
    flight: PropTypes.shape({
      departure: PropTypes.string.isRequired,
      return: PropTypes.string.isRequired,
      originCity: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
      }),
      destinationCity: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
      }),
      class: PropTypes.string.isRequired,
    }).isRequired,
    bookingDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    totalPassenger: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    bookingCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
