import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeaderTicket from "../components/Header/HeaderTicket";
import NavigationDates from "../components/Navbar/NavigationDates";
import FilterButton from "../components/Filter/FilterButton";
import FilterSection from "../components/Filter/FilterSection";
import ResultsSection from "../components/Results/ResultSection";

const DetailTicket = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockTickets = [
        {
          id: 1,
          airline: "Jet Air",
          classType: "Economy",
          departureTime: "07:00",
          departureDate: "3 Maret 2023",
          departureLocation: "Soekarno Hatta - Terminal 1A Domestik",
          departureCity: "JKT",
          duration: "4h 0m",
          flightType: "Direct",
          arrivalTime: "11:00",
          arrivalDate: "3 Maret 2023",
          arrivalLocation: "Melbourne International Airport",
          arrivalCity: "MLB",
          airlineDetail: "Jet Air - Economy - JT-203",
          price: "IDR 4.950.000",
          details: {
            departureDetail: "07:00 - Soekarno Hatta - Terminal 1A Domestik",
            airlineDetail: "Jet Air - Economy - JT-203",
            arrivalDetail: "11:00 - Melbourne International Airport",
          },
        },
        {
          id: 2,
          airline: "SkyFly",
          classType: "Business",
          departureTime: "09:00",
          departureDate: "3 Maret 2023",
          departureLocation: "Soekarno Hatta - Terminal 2 Internasional",
          departureCity: "JKT",
          duration: "5h 0m",
          flightType: "Direct",
          arrivalTime: "14:00",
          arrivalDate: "3 Maret 2023",
          arrivalLocation: "Melbourne International Airport",
          arrivalCity: "MLB",
          airlineDetail: "SkyFly - Business - SF-305",
          price: "IDR 7.250.000",
          details: {
            departureDetail:
              "09:00 - Soekarno Hatta - Terminal 2 Internasional",
            airlineDetail: "SkyFly - Business - SF-305",
            arrivalDetail: "14:00 - Melbourne International Airport",
          },
        },
      ];

      // Tetapkan data tiket ke state
      setTickets(mockTickets);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-[100px] gap-2">
        <HeaderTicket />
        <NavigationDates />
        <div className="w-full md:w-4/5 mx-auto border-t-2 border-gray-300 mt-5 px-4"></div>
        <FilterButton />
        <main className="w-full md:w-4/5 mx-auto mt-8 flex flex-col md:flex-row">
          <FilterSection />
          <ResultsSection loading={loading} tickets={tickets} />
        </main>
      </div>
    </>
  );
};

export default DetailTicket;
