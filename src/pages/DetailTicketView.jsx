import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
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
  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockTickets = [
        {
          id: 1,
          airlinesId: 1,
          airportId: 1,
          departure: new Date("2025-01-04T07:30:00Z"),
          return: new Date("2025-01-04T12:00:00Z"),
          price: 1000000.0,
          capacity: 180,
          class: "Economy",
          information: "Direct flight",
          duration: 120,
          originCityId: 1,
          destinationCityId: 2,
          airports: [
            {
              name: "Soekarno-Hatta International Airport",
              cityId: 1,
              terminal: "T3",
              continent: "Asia",
            },
          ],
          cities: [{ shortname: "CGK", fullname: "Jakarta" }],
          airlines: [{ name: "Garuda Indonesia" }],
        },
        {
          id: 2,
          airlinesId: 2,
          airportId: 1,
          departure: new Date("2023-03-03T09:00:00Z"),
          return: new Date("2023-03-03T14:00:00Z"),
          price: 7250000.0,
          capacity: 180,
          class: "Business",
          information: "Direct flight",
          duration: 300,
          originCityId: 1,
          destinationCityId: 3,
          airports: [
            {
              name: "Soekarno-Hatta International Airport",
              cityId: 1,
              terminal: "T2",
              continent: "Asia",
            },
          ],
          cities: [
            { shortname: "JKT", fullname: "Jakarta" },
            { shortname: "MLB", fullname: "Melbourne" },
          ],
          airlines: [{ name: "SkyFly" }],
        },
        {
          id: 3,
          airlinesId: 3,
          airportId: 1,
          departure: new Date("2023-03-04T13:00:00Z"),
          return: new Date("2023-03-04T19:30:00Z"),
          price: 5600000.0,
          capacity: 180,
          class: "Economy",
          information: "1 Stop",
          duration: 390,
          originCityId: 1,
          destinationCityId: 4,
          airports: [
            {
              name: "Soekarno-Hatta International Airport",
              cityId: 1,
              terminal: "T1C",
              continent: "Asia",
            },
          ],
          cities: [
            { shortname: "JKT", fullname: "Jakarta" },
            { shortname: "SYD", fullname: "Sydney" },
          ],
          airlines: [{ name: "BlueSky" }],
        },
        {
          id: 4,
          airlinesId: 4,
          airportId: 1,
          departure: new Date("2023-03-05T22:00:00Z"),
          return: new Date("2023-03-06T05:15:00Z"),
          price: 12800000.0,
          capacity: 180,
          class: "First Class",
          information: "Direct flight",
          duration: 435,
          originCityId: 1,
          destinationCityId: 3,
          airports: [
            {
              name: "Soekarno-Hatta International Airport",
              cityId: 1,
              terminal: "T3",
              continent: "Asia",
            },
          ],
          cities: [
            { shortname: "JKT", fullname: "Jakarta" },
            { shortname: "MLB", fullname: "Melbourne" },
          ],
          airlines: [{ name: "FlyHigh" }],
        },
        {
          id: 5,
          airlinesId: 5,
          airportId: 1,
          departure: new Date("2023-03-07T18:00:00Z"),
          return: new Date("2023-03-08T02:00:00Z"),
          price: 6800000.0,
          capacity: 180,
          class: "Premium Economy",
          information: "1 Stop",
          duration: 480,
          originCityId: 1,
          destinationCityId: 5,
          airports: [
            {
              name: "Soekarno-Hatta International Airport",
              cityId: 1,
              terminal: "T2",
              continent: "Asia",
            },
          ],
          cities: [
            { shortname: "JKT", fullname: "Jakarta" },
            { shortname: "BNE", fullname: "Brisbane" },
          ],
          airlines: [{ name: "StarWings" }],
        },
        // Repeat for other tickets with the same structure
      ];

      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);

    // const fetchTickets = async () => {
    //   try {
    //     const response = await fetch("/api/flights/");
    //     const data = await response.json();

    //     if (Array.isArray(data.tickets)) {
    //       setTickets(data.tickets);
    //       setFilteredTickets(data.tickets);
    //     } else {
    //       console.error("Unexpected data format from API");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching flight data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchTickets();
  }, []);

  const applyFilter = () => {
    const filterFunctions = {
      "Harga - Termurah": (a, b) => a.price - b.price,
      "Durasi - Terpendek": (a, b) => a.duration - b.duration,
      "Keberangkatan - Paling Awal": (a, b) =>
        new Date(a.departure) - new Date(b.departure),
      "Keberangkatan - Paling Akhir": (a, b) =>
        new Date(b.departure) - new Date(a.departure),
      "Kedatangan - Paling Awal": (a, b) =>
        new Date(a.return) - new Date(b.return),
      "Kedatangan - Paling Akhir": (a, b) =>
        new Date(b.return) - new Date(a.return),
    };

    let updatedTickets = [...tickets];

    if (activeDate) {
      updatedTickets = updatedTickets.filter(
        (ticket) =>
          new Date(ticket.departure).toISOString().split("T")[0] === activeDate
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
      {user ? <LoggedInNavbar /> : <Navbar />}

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
