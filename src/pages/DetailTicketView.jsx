import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getFlights } from "../services/home.service";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HeaderTicket from "../components/Header/HeaderTicket";
import NavigationDates from "../components/Navbar/NavigationDates";
import FilterButton from "../components/Filter/FilterButton";
import FilterSection from "../components/Filter/FilterSection";
import ResultsSection from "../components/Results/ResultSection";
import TitleOfPage from "../components/Title/TitleOfPage";

const DetailTicket = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Termurah");
  const [activeDate, setActiveDate] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { user } = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  TitleOfPage("Aeroloka - Detail Tiket");

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDateStart = searchParams.get("departureDate");
  const returnDateStart = searchParams.get("returnDate");
  const seatClass = searchParams.get("seatClass");
  const adultPassengers = parseInt(searchParams.get("adult")) || 0;
  const childPassengers = parseInt(searchParams.get("child")) || 0;
  const infantPassengers = parseInt(searchParams.get("infant")) || 0;

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

    // Filter tickets based on active date if set
    if (activeDate) {
      updatedTickets = updatedTickets.filter((ticket) => {
        const ticketDate = new Date(ticket.departure).toISOString().split('T')[0];
        return ticketDate === activeDate;
      });
    }

    if (filterFunctions[activeFilter]) {
      updatedTickets.sort(filterFunctions[activeFilter]);
    }

    setFilteredTickets(updatedTickets);
  };

  const handleDateFilter = async (date) => {
    setActiveDate(date);
    setLoading(true);
    
    try {
      const response = await getFlights({
        from,
        to,
        departureDateStart: date,
        returnDateStart: date,
        adultPassengers,
        childPassengers,
        infantPassengers,
        seatClass,
      });

      if (response.data && Array.isArray(response.data)) {
        // Filter tickets for the selected date
        const ticketsForDate = response.data.filter((ticket) => {
          const ticketDate = new Date(ticket.departure).toISOString().split('T')[0];
          return ticketDate === date;
        });

        setTickets(ticketsForDate);
        setFilteredTickets(ticketsForDate);
        
        if (ticketsForDate.length === 0) {
          toast.info("Tidak ada penerbangan yang tersedia untuk tanggal ini");
        }
      } else {
        setTickets([]);
        setFilteredTickets([]);
        toast.error("Tidak ada penerbangan yang tersedia!");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      setTickets([]);
      setFilteredTickets([]);
      toast.error("Penerbangan tidak ditemukan!");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleNavigate = () => {
    if (!user) {
      toast.error("Silahkan login atau register terlebih dahulu!");
      return;
    }

    const params = new URLSearchParams({
      flightId: selectedTicket.id,
      from,
      to,
      departureDateStart,
      returnDateStart,
      adult: adultPassengers,
      child: childPassengers,
      infant: infantPassengers,
      seatClass,
    });

    navigate(`/order-page?${params.toString()}`);
  };

  // Initial fetch of tickets
  useEffect(() => {
    const fetchInitialTickets = async () => {
      setLoading(true);
      try {
        const response = await getFlights({
          from,
          to,
          departureDateStart,
          returnDateStart,
          adultPassengers,
          childPassengers,
          infantPassengers,
          seatClass,
        });

        if (response.data && Array.isArray(response.data)) {
          setTickets(response.data);
          setFilteredTickets(response.data);
        } else {
          toast.error("Tidak ada penerbangan yang tersedia!");
          setTickets([]);
          setFilteredTickets([]);
        }
      } catch (error) {
        toast.error("Penerbangan tidak ditemukan!");
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTickets();
  }, []);

  // Apply filters whenever activeFilter or tickets change
  useEffect(() => {
    applyFilter();
  }, [activeFilter, tickets]);

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}

      <div className="pt-16 gap-2">
        <div className="w-full h-auto py-6 bg-white shadow-md">
          <HeaderTicket />
          <NavigationDates onDateClick={handleDateFilter} tickets={tickets} />
        </div>
        <FilterButton
          tickets={tickets}
          activeDate={activeDate}
          setFilteredData={setFilteredTickets}
          onFilterChange={handleFilterChange}
          selectedFilter={activeFilter}
        />
        <main className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row justify-center">
          {!loading && filteredTickets.length > 0 && <FilterSection />}
          <ResultsSection
            loading={loading}
            tickets={filteredTickets}
            onSelectTicket={handleSelectTicket}
            onNavigate={handleNavigate}
          />
        </main>
      </div>
    </>
  );
};

export default DetailTicket;