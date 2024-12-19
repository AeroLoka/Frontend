import React, { useState } from "react";
import CardTicket from "../Card/CardTicket";

const ResultsSection = ({ loading, tickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleSelect = (ticketId) => {
    setSelectedTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  const renderTickets = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 text-lg font-medium mb-5">
            Mencari penerbangan terbaik...
          </p>
          <div className="animate-pulse w-40 h-20 rounded-md flex items-center justify-center">
            <img
              src="/images/Loading.png"
              alt="Loading Icon"
              className="w-40 h-20"
            />
          </div>
        </div>
      );
    }
    if (Array.isArray(tickets) && tickets.length > 0) {
      return tickets.map((ticket) => (
        <CardTicket
          key={ticket.id}
          ticket={{
            ...ticket,
            airline: ticket.airlines.name,
            classType: ticket.class,
            departureTime: ticket.departure.split("T")[1],
            arrivalTime: ticket.return.split("T")[1],
            departureCity: ticket.originCity.fullname,
            arrivalCity: ticket.destinationCity.fullname,
            flightType: ticket.information,
            duration: `${ticket.duration} menit`,
            price: `Rp ${ticket.price.toLocaleString()}`,
            airlineDetail: ticket.airlines,
          }}
          isOpen={selectedTicketId === ticket.id}
          onSelect={() => handleSelect(ticket.id)}
        />
      ));
    }
    if (Array.isArray(tickets) && tickets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/NotTicket2.png"
            alt="Tiket Habis"
            className="w-72 h-62"
          />
          <p className="text-black text-lg font-medium mt-2">
            Maaf, Tiket terjual habis!
          </p>
          <p className="text-[#7126B5] text-lg font-medium mt-2">
            Coba cari perjalanan lainnya!
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src="/images/ilustrasi.png"
          alt="Flights are not available"
          className="w-72 h-62"
        />
        <p className="text-gray-600 text-lg font-medium mt-4">
          Tidak ada penerbangan yang tersedia
        </p>
      </div>
    );
  };
  return (
    <section className="md:w-4/5 md:ml-8 mt-8 md:mt-0 flex-col items-center justify-center">
      {renderTickets()}
    </section>
  );
};

export default ResultsSection;
