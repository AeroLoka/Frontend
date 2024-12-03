import React, { useState } from "react";
import CardTicket from "../Card/CardTicket";

const ResultsSection = ({ loading, tickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleSelect = (ticketId) => {
    setSelectedTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  return (
    <section className="md:w-4/5 md:ml-8 mt-8 md:mt-0 flex-col items-center justify-center">
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
      ) : tickets && tickets.length === 0 ? (
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
      ) : (
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
      )}
    </section>
  );
};

export default ResultsSection;
