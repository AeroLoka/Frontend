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
  const [sortBy, setSortBy] = useState("harga-termurah");
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

  const applyFilter = () => {
    const filterFunctions = {
      "harga-termurah": (a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price);
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price);
        return priceA - priceB;
      },
      "harga-termahal": (a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price);
        const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price);
        return priceB - priceA;
      },
      "durasi-terpendek": (a, b) => {
        const durationA = typeof a.duration === 'number' ? a.duration : 0;
        const durationB = typeof b.duration === 'number' ? b.duration : 0;
        return durationA - durationB;
      },
      "durasi-terpanjang": (a, b) => {
        const durationA = typeof a.duration === 'number' ? a.duration : 0;
        const durationB = typeof b.duration === 'number' ? b.duration : 0;
        return durationB - durationA;
      },
      "keberangkatan-paling-awal": (a, b) => {
        const timeA = new Date(a.departure || a.departureTime).getTime();
        const timeB = new Date(b.departure || b.departureTime).getTime();
        return timeA - timeB;
      },
      "keberangkatan-paling-akhir": (a, b) => {
        const timeA = new Date(a.departure || a.departureTime).getTime();
        const timeB = new Date(b.departure || b.departureTime).getTime();
        return timeB - timeA;
      },
      "kedatangan-paling-awal": (a, b) => {
        const timeA = new Date(a.return || a.returnTime).getTime();
        const timeB = new Date(b.return || b.returnTime).getTime();
        return timeA - timeB;
      },
      "kedatangan-paling-akhir": (a, b) => {
        const timeA = new Date(a.return || a.returnTime).getTime();
        const timeB = new Date(b.return || b.returnTime).getTime();
        return timeB - timeA;
      },
    };
  
    let updatedTickets = [...tickets];
  
    if (filterFunctions[sortBy]) {
      updatedTickets.sort(filterFunctions[sortBy]);
    }
  
    setFilteredTickets(updatedTickets);
  };

  const handleFilterChange = (filter) => {
    const backendFilter = filter.toLowerCase().replace(/\s+/g, '-');
    setSortBy(backendFilter);
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

  useEffect(() => {
    applyFilter();
  }, [sortBy, tickets]);

  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}

      <div className="pt-16 gap-2">
        <div className="w-full h-auto py-6 bg-white shadow-md">
          <HeaderTicket />
          <NavigationDates onDateClick={handleDateFilter} tickets={tickets} />
        </div>
        <FilterButton
          onFilterChange={handleFilterChange}
          selectedFilter={sortBy}
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