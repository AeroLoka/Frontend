import React from "react";
import PropTypes from "prop-types";
import PaidButton from "../Button/PaidButton";

const OrderCard = ({ ticket }) => {
  const {
    bookingCode,
    status,
    departureTime,
    departureDate,
    departureCity,
    classType,
    arrivalTime,
    arrivalDate,
    duration,
    arrivalCity,
    price,
  } = ticket;

  const dateForDeparture = new Date(departureDate);
  const departure_date = dateForDeparture.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
  });

  const dateForReturn = new Date(arrivalDate);
  const arrival_date = dateForReturn.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

  const buttonType =
    status === "paid"
      ? "paid"
      : status.toLowerCase() === "unpaid"
      ? "unpaid"
      : "cancelled";

  return (
    <div className="w-full min-w-[320px] p-4 sm:p-6 border-2 hover:border-[#7126B5BF] rounded-lg flex flex-col justify-between items-center active:border-[#7126B5BF] bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow mx-auto">
      <div className="self-start">
        <PaidButton type={buttonType}>{status}</PaidButton>
      </div>

      {/* Route Section */}
      <div className="w-full border-b border-gray-300 p-2 sm:p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          {/* Departure Section */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/icons/Icon_wrapper.svg"
              alt="Toggle Details"
              className="w-6 h-6"
            />
            <div className="text-center sm:text-left">
              <p className="font-bold text-sm sm:text-base">
                {departureCity}
              </p>
              <p className="font-medium text-xs sm:text-sm">
                {departure_date}
              </p>
              <p className="font-medium text-xs sm:text-sm">
                {departureTime}
              </p>
            </div>
          </div>

          {/* Duration Section */}
          <div className="text-sm flex flex-col ml-6 md:ml-0 items-center flex-1">
            <p className="font-medium text-xs sm:text-sm text-[#3C3C3C] mb-2">
              {duration}
            </p>
            <div className="w-full max-w-[233px] h-[1px] bg-gray-300"></div>
          </div>

          {/* Arrival Section */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/icons/Icon_wrapper.svg"
              alt="Toggle Details"
              className="w-6 h-6"
            />
            <div className="text-center sm:text-left">
              <p className="font-bold text-sm sm:text-base">
                {arrivalCity}
              </p>
              <p className="font-medium text-xs sm:text-sm">
                {arrival_date}
              </p>
              <p className="font-medium text-xs sm:text-sm">
                {arrivalTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-4 pt-2 pb-2 flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-8">
        <div className="text-center sm:text-left">
          <p className="font-bold text-sm sm:text-base">Booking Code:</p>
          <p className="font-medium text-sm sm:text-base">
            {bookingCode}
          </p>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold text-sm sm:text-base">Class:</p>
          <p className="font-medium text-sm sm:text-base">{classType}</p>
        </div>
        <p className="text-[#7126B5] font-bold text-lg">{`IDR ${price.toLocaleString()}`}</p>
      </div>
    </div>
  );
};

OrderCard.defaultProps = {
  ticket: {
    departureCity: "Not Available",
    departureDate: "Unknown",
    departureTime: "00:00",
    arrivalCity: "Not Available",
    arrivalDate: "Unknown",
    arrivalTime: "00:00",
    duration: "Unknown",
    bookingCode: "No Code",
    classType: "Not Specified",
    price: 0,
  },
};

OrderCard.propTypes = {
  ticket: PropTypes.shape({
    departureCity: PropTypes.string,
    departureDate: PropTypes.string,
    departureTime: PropTypes.string,
    arrivalCity: PropTypes.string,
    arrivalDate: PropTypes.string,
    arrivalTime: PropTypes.string,
    duration: PropTypes.string,
    bookingCode: PropTypes.string,
    classType: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default OrderCard;
