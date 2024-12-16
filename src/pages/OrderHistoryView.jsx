import React, { useState, useEffect } from "react";
import { getAllBookingsByUserId } from "../services/orderhistory.service";
import OrderCard from "../components/Card/OrderCard";
import OrderDetailCard from "../components/Card/OrderDetailCard";
import Navbar from "../components/Navbar/Navbar";
import HeaderOrder from "../components/Header/HeaderOrder";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const user = useSelector((state) => state.user.user);
  const userId = user?.userId || 123;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailView, setDetailView] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("User from Redux:", user);

  const fetchBookings = async () => {
    if (!userId) {
      setError("Silakan login untuk melihat riwayat pemesanan Anda.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching bookings with userId:", userId);
      const data = await getAllBookingsByUserId(
        userId,
        selectedDate || null,
        null
      );

      console.log("Raw bookings from API:", data);
      if (data.status === 200) {
        setBookings(data.data || []);
      } else {
        setError(data.message || "Terjadi kesalahan saat mengambil data.");
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId, selectedDate, searchLocation]);

  const handleOrderCardClick = (ticket) => {
    setSelectedOrder(ticket);
    if (window.innerWidth < 768) setDetailView(true);
  };

  const handleBackToList = () => {
    setDetailView(false);
  };

  // const handleLocationSearch = (location) => {
  //   setSearchLocation(location.toLowerCase());
  // };

  // const handleDateFilter = (date) => {
  //   setSelectedDate(date);
  // };

  const formatCurrency = (value) => `IDR ${value.toLocaleString("id-ID")}`;

  const filteredBookings =
    bookings.length > 0
      ? bookings.filter((ticket) => {
          const isDateMatched = selectedDate
            ? ticket.departureDate === selectedDate
            : true;
          const isLocationMatched = searchLocation
            ? ticket.departureCity.toLowerCase().includes(searchLocation) ||
              ticket.arrivalCity.toLowerCase().includes(searchLocation)
            : true;
          return isDateMatched && isLocationMatched;
        })
      : [];

  console.log("Filtered Bookings:", filteredBookings);

  const groupedBookings =
    bookings.length > 0
      ? bookings.reduce((acc, ticket) => {
          if (!ticket.departureDate) return acc;
          const date = new Date(ticket.departureDate);
          const key = `${date.toLocaleString("id-ID", {
            month: "long",
          })} ${date.getFullYear()}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {})
      : {};

  console.log("Raw bookings:", bookings);

  const isBookingsEmpty = Object.keys(groupedBookings).length === 0;
  console.log("Grouped Bookings:", groupedBookings);

  return (
    <>
      <LoggedInNavbar />
      <HeaderOrder
        onFilterDate={(date) => setSelectedDate(date)}
        onSearchLocation={(location) =>
          setSearchLocation(location.toLowerCase())
        }
      />
      <div className="container mx-auto mt-10 flex justify-center items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : isBookingsEmpty ? (
          <div className="text-center mx-auto justify-center items-center">
            <img
              src="./images/Cartshopping.png"
              alt="Tiket Habis"
              className="w-62 h-62"
            />
            <p className="text-black text-lg font-medium mt-2">
              {error ? error : "Anda belum melakukan pemesanan penerbangan."}
            </p>
          </div>
        ) : (
          <div className="w-full">
            {/* Mobile View */}
            <div className="md:hidden">
              {!isDetailView ? (
                <div className="flex flex-col gap-8 justify-center items-center">
                  {Object.keys(groupedBookings).map((monthYear) => (
                    <div key={monthYear} className="mb-10">
                      <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                      <div className="flex flex-col gap-4">
                        {groupedBookings[monthYear].map((ticket, index) => (
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
                    className="mb-4 text-blue-500 underline text-start"
                  >
                    ← Kembali ke Daftar Pesanan
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
                {Object.keys(groupedBookings).map((monthYear) => (
                  <div key={monthYear} className="mb-10">
                    <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                    <div className="flex flex-col gap-4">
                      {groupedBookings[monthYear].map((ticket, index) => (
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
                    Pilih salah satu pesanan untuk melihat detailnya.
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
