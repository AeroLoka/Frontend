import React, { useState } from "react";
import OrderCard from "../components/Card/OrderCard";
import OrderDetailCard from "../components/Card/OrderDetailCard";
import Navbar from "../components/Navbar/Navbar";
import SubHeader from "../components/Header/SubHeader";

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const mockTickets = [
    {
      departureCity: "Jakarta",
      departureDate: "5 Maret 2023",
      departureTime: "19:10",
      arrivalCity: "Melbourne",
      arrivalDate: "5 Maret 2023",
      arrivalTime: "21:10",
      duration: "4h 0m",
      bookingCode: "6723y2GHK",
      classType: "Economy",
      price: 9850000,
      priceDetails: [
        { label: "Harga Tiket", value: 9000000 },
        { label: "Pajak", value: 500000 },
        { label: "Asuransi", value: 350000 },
      ],
      totalPrice: "IDR 9,850,000",
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Jakarta",
      departureDate: "1 Maret 2023",
      departureTime: "07:00",
      arrivalCity: "Bali",
      arrivalDate: "1 Maret 2023",
      arrivalTime: "08:15",
      duration: "1h 15m",
      bookingCode: "67562320G",
      classType: "Business",
      price: 3250000,
      priceDetails: [
        { label: "Harga Tiket", value: 2900000 },
        { label: "Pajak", value: 300000 },
        { label: "Asuransi", value: 50000 },
      ],
      totalPrice: "IDR 3,250,000",
      status: "Unpaid",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Jakarta",
      departureDate: "11 Februari 2023",
      departureTime: "07:00",
      arrivalCity: "Medan",
      arrivalDate: "11 Februari 2023",
      arrivalTime: "08:15",
      duration: "1h 15m",
      bookingCode: "601U95667G",
      classType: "Economy",
      price: 2950000,
      priceDetails: [
        { label: "Harga Tiket", value: 2600000 },
        { label: "Pajak", value: 350000 },
        { label: "Asuransi", value: 50000 },
      ],
      totalPrice: "IDR 2,950,000",
      status: "Cancelled",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Medan",
      departureDate: "8 Februari 2023",
      departureTime: "17:00",
      arrivalCity: "Palu",
      arrivalDate: "8 Februari 2023",
      arrivalTime: "19:05",
      duration: "2h 05m",
      bookingCode: "356875O9UD",
      classType: "Business",
      price: 4060000,
      priceDetails: [
        { label: "Harga Tiket", value: 3800000 },
        { label: "Pajak", value: 150000 },
        { label: "Asuransi", value: 60000 },
      ],
      totalPrice: "IDR 4,060,000",
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
    {
      departureCity: "Surabaya",
      departureDate: "10 Januari 2023",
      departureTime: "10:00",
      arrivalCity: "Makassar",
      arrivalDate: "10 Januari 2023",
      arrivalTime: "12:15",
      duration: "2h 15m",
      bookingCode: "123456789",
      classType: "Economy",
      price: 2100000,
      priceDetails: [
        { label: "Harga Tiket", value: 1900000 },
        { label: "Pajak", value: 150000 },
        { label: "Asuransi", value: 50000 },
      ],
      totalPrice: "IDR 2,100,000",
      status: "Issued",
      passengers: [
        { type: "Penumpang 1", name: "Mr. Harry Potter", id: "1234567" },
        { type: "Penumpang 2", name: "Miss Hermione", id: "789658" },
      ],
    },
  ];

  // Mengelompokkan data berdasarkan bulan dan tahun
  const groupedTickets = mockTickets.reduce((acc, ticket) => {
    const [day, month, year] = ticket.departureDate.split(" ");
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const handleOrderCardClick = (ticket) => {
    setSelectedOrder(ticket); // Atur pesanan yang dipilih
  };

  return (
    <>
      <Navbar />
      <SubHeader />
      <div className="container mx-auto mt-10 flex gap-8">
        {/* List OrderCard */}
        <div className="flex-1">
          {Object.keys(groupedTickets).map((monthYear) => (
            <div key={monthYear} className="mb-10">
              <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
              <div className="flex flex-col gap-4">
                {groupedTickets[monthYear].map((ticket, index) => (
                  <div
                    key={index}
                    onClick={() => handleOrderCardClick(ticket)} // Tangkap klik
                    className="cursor-pointer"
                  >
                    <OrderCard ticket={ticket} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Order */}
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
    </>
  );
};

export default OrderHistory;
