import React, { useEffect, useState } from "react";
import OrderCard from "../components/Card/OrderCard";
import OrderDetailCard from "../components/Card/OrderDetailCard";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HeaderOrder from "../components/Header/HeaderOrder";
import TitleOfPage from "../components/Title/TitleOfPage";
import { getAllBookingByUser } from "../services/transaction.service";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderHistory = () => {
  TitleOfPage("Aeroloka - Riwayat Pesanan");
  
  const { email } = useSelector((state) => state.userState.user);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailView, setDetailView] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredDate, setFilteredDate] = useState(null);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  const getData = async () => {
    try {
      const params = {
        email: email,
        from: fromDate ? fromDate.toISOString().split('T')[0] : undefined,
        to: toDate ? toDate.toISOString().split('T')[0] : undefined
      };
      const response = await getAllBookingByUser(params);
      console.log(params)
      setData(response.data);
    } catch (error) {
      toast.error(error.message || "Failed to load orders");
    }
  };

  useEffect(() => {
    getData();
  }, [fromDate, toDate]);



  const handleOrderCardClick = (ticket) => {
    setSelectedOrder(ticket);
    if (window.innerWidth < 768) setDetailView(true);
  };

  const handleBackToList = () => {
    setDetailView(false);
  };

  const handleLocationSearch = (location) => {
    setSearchLocation(location.toLowerCase());
  };

  // Updated to handle date range
  const handleDateFilter = (dateRange) => {
    if (dateRange.startDate && dateRange.endDate) {
      setFromDate(dateRange.startDate);
      setToDate(dateRange.endDate);
    } else {
      setFromDate(null);
      setToDate(null);
    }
  };

  const formatTicketData = (booking) => {
    const durationHours = Math.floor(booking.flight.duration / 60);
    const durationMinutes = booking.flight.duration % 60;

    return {
      departureCity: booking.flight.originCity.fullname,
      departureLocation: booking.flight.airport.name,
      departureTerminal: booking.flight.airport.terminal,
      departureDate: new Date(booking.flight.departure.split("T")[0]),
      departureTime: booking.flight.departure.split("T")[1].slice(0, 5),
      arrivalCity: booking.flight.destinationCity.fullname,
      arrivalLocation: `${booking.flight.destinationCity.fullname}`,
      arrivalDate: new Date(booking.flight.return.split("T")[0]),
      arrivalTime: booking.flight.return.split("T")[1].slice(0, 5),
      duration: `${durationHours} h ${durationMinutes} m`,
      bookingCode: booking.bookingCode,
      bookingDate: booking.bookingDate,
      classType: booking.flight.class,
      airline: "Airline Name",
      flightCode: "Airline " + booking.flightId.toString(),
      price: parseInt(booking.totalPrice),
      totalPrice: parseInt(booking.totalPrice) * booking.passengers.length,
      status: booking.status,
      information: booking.flight.information,
      passengers: booking && booking.passengers ? booking.passengers.length : [],
    };
  };

  const filteredTickets = data
    .map(formatTicketData)
    .filter((ticket) => {
      // Location filter remains the same
      const isLocationMatched = searchLocation
        ? ticket.departureCity.toLowerCase().includes(searchLocation) ||
          ticket.arrivalCity.toLowerCase().includes(searchLocation)
        : true;
      return isLocationMatched;
    });

  const groupedTickets = filteredTickets.reduce((acc, ticket) => {
    const date = ticket.departureDate;
    const key = date.toLocaleString('id-ID', { year: 'numeric', month: 'long' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const isTicketsEmpty = Object.keys(groupedTickets).length === 0;

  return (
    <>
      <LoggedInNavbar />
      <HeaderOrder
        onFilterDate={handleDateFilter}
        onSearchLocation={handleLocationSearch}
      />
      <div className="container mx-auto mt-10 flex justify-center items-center">
        {isTicketsEmpty ? (
          <div className="text-center mx-auto justify-center items-center">
            <img
              src="./images/Cartshopping.png"
              alt="No Tickets"
              className="w-62 h-62"
            />
            <p className="text-black text-lg font-medium mt-2">
              Sorry, no tickets found!
            </p>
            <p className="text-[#7126B5] text-lg font-medium mt-2">
              You haven't made any flight bookings yet.
            </p>
          </div>
        ) : (
          <div className="w-full">
            {/* Mobile View */}
            <div className="md:hidden">
              {!isDetailView ? (
                <div className="flex flex-col gap-8 justify-center items-center">
                  {Object.entries(groupedTickets).map(([monthYear, tickets]) => (
                    <div key={monthYear} className="mb-10">
                      <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                      <div className="flex flex-col gap-4">
                        {tickets.map((ticket, index) => (
                          <div
                            key={index}
                            onClick={() => handleOrderCardClick(ticket)}
                            className="cursor-pointer"
                          >
                            <OrderCard ticket={ticket} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleBackToList}
                    className="mb-4 text-purple-500 text-start flex gap-2"
                  >
                    <span className="mt-1"><FaArrowLeft /></span>Back to Order List
                  </button>
                  {selectedOrder && (
                    <OrderDetailCard orderDetails={selectedOrder} />
                  )}
                </div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex gap-8">
              <div className="flex-1">
                {Object.entries(groupedTickets).map(([monthYear, tickets]) => (
                  <div key={monthYear} className="mb-10">
                    <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                    <div className="flex flex-col gap-4">
                      {tickets.map((ticket, index) => (
                        <div
                          key={index}
                          onClick={() => handleOrderCardClick(ticket)}
                          className="cursor-pointer"
                        >
                          <OrderCard ticket={ticket} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                {selectedOrder ? (
                  <OrderDetailCard orderDetails={selectedOrder} />
                ) : (
                  <p className="text-gray-500">
                    Select an order to view its details.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;