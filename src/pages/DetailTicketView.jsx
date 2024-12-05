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
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Termurah");
  const [activeDate, setActiveDate] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockTickets = [
        {
          id: 1,
          airline: "Jet Air",
          classType: "Economy",
          departureTime: "07:00",
          departureDate: "02/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 1A Domestik",
          departureCity: "JKT",
          duration: "4h 0m",
          flightType: "Direct",
          arrivalTime: "11:00",
          arrivalDate: "02/03/2023",
          arrivalLocation: "Melbourne International Airport",
          arrivalCity: "MLB",
          airlineDetail: "Jet Air - Economy - JT-203",
          price: "IDR 4.950.000",
        },
        {
          id: 2,
          airline: "SkyFly",
          classType: "Business",
          departureTime: "09:00",
          departureDate: "03/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 2 Internasional",
          departureCity: "JKT",
          duration: "5h 0m",
          flightType: "Direct",
          arrivalTime: "14:00",
          arrivalDate: "03/03/2023",
          arrivalLocation: "Melbourne International Airport",
          arrivalCity: "MLB",
          airlineDetail: "SkyFly - Business - SF-305",
          price: "IDR 7.250.000",
        },
        {
          id: 3,
          airline: "BlueSky",
          classType: "Economy",
          departureTime: "13:00",
          departureDate: "04/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 1C Domestik",
          departureCity: "JKT",
          duration: "6h 30m",
          flightType: "1 Stop",
          arrivalTime: "19:30",
          arrivalDate: "04/03/2023",
          arrivalLocation: "Sydney Kingsford Smith Airport",
          arrivalCity: "SYD",
          airlineDetail: "BlueSky - Economy - BS-402",
          price: "IDR 5.600.000",
        },
        {
          id: 4,
          airline: "FlyHigh",
          classType: "First Class",
          departureTime: "22:00",
          departureDate: "05/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 3 Internasional",
          departureCity: "JKT",
          duration: "7h 15m",
          flightType: "Direct",
          arrivalTime: "05:15",
          arrivalDate: "06/03/2023",
          arrivalLocation: "Melbourne International Airport",
          arrivalCity: "MLB",
          airlineDetail: "FlyHigh - First Class - FH-708",
          price: "IDR 12.800.000",
        },
        {
          id: 5,
          airline: "StarWings",
          classType: "Premium Economy",
          departureTime: "18:00",
          departureDate: "07/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 2 Domestik",
          departureCity: "JKT",
          duration: "8h 0m",
          flightType: "1 Stop",
          arrivalTime: "02:00",
          arrivalDate: "08/03/2023",
          arrivalLocation: "Brisbane Airport",
          arrivalCity: "BNE",
          airlineDetail: "StarWings - Premium Economy - SW-509",
          price: "IDR 6.800.000",
        },
        {
          id: 6,
          airline: "AirLuxe",
          classType: "Business",
          departureTime: "15:00",
          departureDate: "07/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 3 Internasional",
          departureCity: "JKT",
          duration: "7h 45m",
          flightType: "Direct",
          arrivalTime: "22:45",
          arrivalDate: "07/03/2023",
          arrivalLocation: "Perth Airport",
          arrivalCity: "PER",
          airlineDetail: "AirLuxe - Business - AL-712",
          price: "IDR 9.200.000",
        },
        {
          id: 7,
          airline: "SwiftAir",
          classType: "Economy",
          departureTime: "06:00",
          departureDate: "08/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 2 Domestik",
          departureCity: "JKT",
          duration: "9h 0m",
          flightType: "1 Stop",
          arrivalTime: "15:00",
          arrivalDate: "08/03/2023",
          arrivalLocation: "Singapore Changi Airport",
          arrivalCity: "SIN",
          airlineDetail: "SwiftAir - Economy - SA-201",
          price: "IDR 4.000.000",
        },
        {
          id: 8,
          airline: "Jetstream",
          classType: "First Class",
          departureTime: "20:00",
          departureDate: "08/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 1B Domestik",
          departureCity: "JKT",
          duration: "6h 45m",
          flightType: "Direct",
          arrivalTime: "02:45",
          arrivalDate: "09/03/2023",
          arrivalLocation: "Tokyo Haneda Airport",
          arrivalCity: "HND",
          airlineDetail: "Jetstream - First Class - JS-102",
          price: "IDR 11.500.000",
        },
        {
          id: 9,
          airline: "CloudAir",
          classType: "Economy",
          departureTime: "10:00",
          departureDate: "09/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 2 Internasional",
          departureCity: "JKT",
          duration: "8h 0m",
          flightType: "1 Stop",
          arrivalTime: "18:00",
          arrivalDate: "09/03/2023",
          arrivalLocation: "Seoul Incheon Airport",
          arrivalCity: "ICN",
          airlineDetail: "CloudAir - Economy - CA-509",
          price: "IDR 5.800.000",
        },
        {
          id: 10,
          airline: "FlyAsia",
          classType: "Business",
          departureTime: "14:00",
          departureDate: "09/03/2023",
          departureLocation: "Soekarno Hatta - Terminal 1A Internasional",
          departureCity: "JKT",
          duration: "4h 30m",
          flightType: "Direct",
          arrivalTime: "18:30",
          arrivalDate: "09/03/2023",
          arrivalLocation: "Kuala Lumpur International Airport",
          arrivalCity: "KUL",
          airlineDetail: "FlyAsia - Business - FA-707",
          price: "IDR 7.300.000",
        },
      ];

      // Tetapkan data tiket ke state
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const applyFilter = () => {
    const filterFunctions = {
      "Harga - Termurah": (a, b) =>
        parseInt(a.price.replace(/\D/g, "")) -
        parseInt(b.price.replace(/\D/g, "")),
      "Durasi - Terpendek": (a, b) => {
        const durationToMinutes = (d) =>
          parseInt(d.split("h")[0]) * 60 +
          parseInt(d.split("h")[1]?.split("m")[0] || 0);
        return durationToMinutes(a.duration) - durationToMinutes(b.duration);
      },
      "Keberangkatan - Paling Awal": (a, b) =>
        a.departureTime.localeCompare(b.departureTime),
      "Keberangkatan - Paling Akhir": (a, b) =>
        b.departureTime.localeCompare(a.departureTime),
      "Kedatangan - Paling Awal": (a, b) =>
        a.arrivalTime.localeCompare(b.arrivalTime),
      "Kedatangan - Paling Akhir": (a, b) =>
        b.arrivalTime.localeCompare(a.arrivalTime),
    };

    let updatedTickets = [...tickets];

    if (activeDate) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.departureDate === activeDate
      );
    }

    if (filterFunctions[activeFilter]) {
      updatedTickets.sort(filterFunctions[activeFilter]);
    }

    setFilteredTickets(updatedTickets);
  };

  useEffect(() => {
    applyFilter();
  }, [activeFilter, activeDate]);

  const handleDateFilter = (date) => {
    setActiveDate(date);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <Navbar />
      <div className="pt-[100px] gap-2">
        <div className="w-full h-[231px] bg-white shadow-md ">
          <HeaderTicket />
          <NavigationDates onDateClick={handleDateFilter} />
        </div>
        <FilterButton
          tickets={tickets}
          activeDate={activeDate}
          setFilteredData={setFilteredTickets}
          onFilterChange={handleFilterChange}
          selectedFilter={activeFilter}
        />
        <main className="w-full md:w-4/5 mx-auto mt-8 flex flex-col md:flex-row justify-center">
          {!loading && filteredTickets.length > 0 && <FilterSection />}
          <ResultsSection loading={loading} tickets={filteredTickets} />
        </main>
      </div>
    </>
  );
};

export default DetailTicket;
