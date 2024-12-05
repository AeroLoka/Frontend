import PaidButton from "../Button/PaidButton";

const OrderDetailCard = ({ orderDetails }) => {
  if (!orderDetails) {
    return <div className="text-red-600">Data pesanan tidak tersedia.</div>;
  }

  const {
    bookingCode,
    status,
    departureTime,
    departureDate,
    departureLocation,
    airline,
    classType,
    flightCode,
    passengers,
    arrivalTime,
    arrivalDate,
    arrivalLocation,
    priceDetails,
    totalPrice,
  } = orderDetails;

  // Mapping status to PaidButton type
  const buttonType =
    status === "Issued"
      ? "issued"
      : status.toLowerCase() === "unpaid"
      ? "unpaid"
      : "cancelled";

  return (
    <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Detail Pesanan</h2>
        <PaidButton type={buttonType}>{status}</PaidButton>
      </div>

      {/* Booking Code */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Booking Code:</p>
        <p className="text-lg font-bold text-purple-700">{bookingCode}</p>
      </div>

      {/* Departure Details */}
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

      {/* Flight Info */}
      <div className="flex items-center gap-[8px] mt-[12px]">
        <img
          src="/src/assets/icons/Thumbnail.svg"
          alt="Airline Logo"
          className="w-6 h-6"
        />
        <div className="border-t border-gray-300 pt-4 mb-6">
          <p className="text-sm font-semibold">{`${airline} - ${classType}`}</p>
          <p className="text-sm text-gray-500">{`Flight Code: ${flightCode}`}</p>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-yellow-600 mb-2">Informasi:</p>
        {passengers && passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <p key={index} className="text-sm text-gray-600">
              {`${passenger.type}: ${passenger.name} (ID: ${passenger.id})`}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Tidak ada informasi penumpang.
          </p>
        )}
      </div>

      {/* Arrival Details */}
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

      {/* Price Details */}
      <div className="border-t border-gray-300 pt-4 mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-2">
          Rincian Harga:
        </p>
        {priceDetails && priceDetails.length > 0 ? (
          priceDetails.map((priceDetail, index) => (
            <p
              key={index}
              className="text-sm text-gray-600 flex justify-between"
            >
              <span>{priceDetail.label}</span>
              <span>{priceDetail.value}</span>
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">Tidak ada rincian harga.</p>
        )}
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Total</p>
        <p className="text-xl font-bold text-purple-700">{totalPrice}</p>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button
          className={`w-full py-3 rounded-lg font-bold text-lg transition ${
            buttonType === "unpaid"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-purple-700 hover:bg-purple-800 text-white"
          }`}
        >
          {buttonType === "unpaid" ? "Lanjut Bayar" : "Cetak Tiket"}{" "}
          {/* Teks tombol */}
        </button>
      </div>
    </div>
  );
};

OrderDetailCard.defaultProps = {
  orderDetails: {
    bookingCode: "",
    status: "Pending",
    departureTime: "",
    departureDate: "",
    departureLocation: "",
    airline: "",
    classType: "",
    flightCode: "",
    passengers: [],
    arrivalTime: "",
    arrivalDate: "",
    arrivalLocation: "",
    priceDetails: [],
    totalPrice: "IDR 0",
  },
};

export default OrderDetailCard;
