import { useNavigate } from "react-router-dom";
import PaidButton from "../Button/PaidButton";
import { toast } from "react-toastify";

const OrderDetailCard = ({ orderDetails }) => {
    const navigate = useNavigate();

    if (!orderDetails) {
        return <div className="text-red-600">Data pesanan tidak tersedia.</div>;
    }

    const {
        bookingCode,
        bookingDate,
        status,
        departureTime,
        departureDate,
        departureLocation,
        departureTerminal,
        airline,
        classType,
        flightCode,
        arrivalTime,
        arrivalDate,
        arrivalLocation,
        price,
        totalPrice,
        information,
        passengers,
    } = orderDetails;

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

    const dateForBooking = new Date(bookingDate);
    const booking_date = dateForBooking.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Mapping status to PaidButton type
    const buttonType =
        status === "paid"
            ? "paid"
            : status.toLowerCase() === "unpaid"
            ? "unpaid"
            : "cancelled";

    const handleClick = async () => {
        if (buttonType === "unpaid") {
            navigate(`/payment?booking-code=${bookingCode}`);
        } else {
            try {
                const response = await sendTicket({ email, bookingCode });
                toast.success("Tiket berhasil dikirim ke email Anda");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const showButton = status.toLowerCase() !== "cancelled";

    return (
        <div className="border-2  border-gray-300 rounded-lg hover:shadow-lg transition-shadow p-6 bg-white shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Detail Pesanan</h2>
                <PaidButton type={buttonType}>{status}</PaidButton>
            </div>

            {/* Booking Code */}
            <div className="mb-2 flex  items-center gap-4">
                <p className="text-[18px] leading-[26px]">Booking Code:</p>
                <p className="text-lg font-bold text-purple-700">
                    {bookingCode}
                </p>
            </div>

            <div className="mb-4 flex  items-center gap-4">
                <p className="text-[18px] leading-[26px]">Tanggal Booking:</p>
                <p className="text-lg font-bold text-purple-700">
                    {booking_date}
                </p>
            </div>

            {/* Departure Details */}
            <div className="flex justify-between gap-4 pb-4">
                <div className="flex flex-col">
                    <p className="font-bold text-[16px] leading-[24px]">
                        {departureTime}
                    </p>
                    <p className="font-normal text-[16px] leading-[24px]">
                        {departure_date}
                    </p>
                    <p className="font-medium text-[14px] leading-[20px]">
                        {departureLocation} - {departureTerminal}
                    </p>
                </div>
                <p className="font-bold text-[12px] leading-[18px] text-[#A06ECE] text-right">
                    Keberangkatan
                </p>
            </div>

            {/* Flight Info */}
            <div className="flex items-center gap-[8px] mt-[12px] border-t border-gray-300">
                <img src="/logo.png" alt="Airline Logo" className="w-6 h-6" />
                <div className="pt-4">
                    <p className="font-bold text-[14px] leading-[18px]">{`${airline} - ${classType}`}</p>
                    <p className="font-bold text-[14px] leading-[18px]">{`${flightCode}`}</p>
                    <div className="mb-4 mt-4">
                        <p className="font-bold text-[14px] leading-[18px]">
                            Informasi:
                        </p>
                        {information}
                    </div>
                </div>
            </div>

            {/* Arrival Details */}
            <div className="border-t border-gray-300">
                <div className="flex justify-between mt-4 mb-4">
                    <div className="flex flex-col">
                        <p className="font-bold text-[16px] leading-[24px]">
                            {arrivalTime}
                        </p>
                        <p className="font-normal text-[16px] leading-[24px]">
                            {arrival_date}
                        </p>
                        <p className="font-medium text-[14px] leading-[20px]">
                            {arrivalLocation}
                        </p>
                    </div>
                    <p className="font-bold text-[12px] leading-[18px] text-[#A06ECE] text-right">
                        Kedatangan
                    </p>
                </div>
            </div>

            {/* Price Details */}
            <div className="border-t border-gray-300 pt-4 mb-6">
                <p className="font-bold text-[16px] leading-[24px]">
                    Rincian Harga:
                </p>
                <div className="flex justify-between">
                    <span>{passengers} Ticket(s)</span>
                    <span>IDR {price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>IDR 0</span>
                </div>
            </div>

            {/* Total Price */}
            <div className=" border-t border-gray-300 mb-1">
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold">Total</p>
                    <p className="text-xl font-bold text-purple-700">
                        IDR {totalPrice.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Button - Only show if status is not cancelled */}
            {showButton && (
                <div className="mt-4 gap-2">
                    <button
                        onClick={handleClick}
                        className={`w-full h-[62px] py-3 rounded-[12px] font-bold text-lg transition ${
                            buttonType === "unpaid"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-purple-700 hover:bg-purple-800 text-white"
                        }`}
                    >
                        {buttonType === "unpaid"
                            ? "Lanjut Bayar"
                            : "Cetak Tiket"}{" "}
                    </button>
                </div>
            )}
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