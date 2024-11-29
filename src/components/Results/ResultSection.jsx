import React, { useState } from "react";
import CardTicket from "../Card/CardTicket";

const ResultsSection = ({ loading, tickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleSelect = (ticketId) => {
    setSelectedTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  return (
    <section className="md:w-3/4 md:ml-8 mt-8 md:mt-0 flex flex-col items-center">
      {loading ? (
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
      ) : tickets && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <CardTicket
            key={ticket.id}
            ticket={ticket}
            isOpen={selectedTicketId === ticket.id}
            onSelect={() => handleSelect(ticket.id)}
          />
        ))
      ) : (
        <div className="text-center">
          <img
            src="/images/ilustrasi.png"
            alt="Ilustrasi"
            className="w-72 h-62"
          />
          <p className="text-gray-600 text-lg font-medium mt-4">
            Tidak ada penerbangan yang tersedia
          </p>
        </div>
      )}
    </section>
  );
};

export default ResultsSection;
