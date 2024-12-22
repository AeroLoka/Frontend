import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalDateFilter from "../Modals/ModalDataFilter";
import ModalLocationFilter from "../Modals/ModalLocationFilter";
import "react-datepicker/dist/react-datepicker.css";

const HeaderOrder = ({ onAddFlight, onFilterDate, onSearchLocation }) => {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const handleBeranda = () => {
    navigate("/");
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  // Format date for display in Indonesian format
  const formatDisplayDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setDateRange({
      startDate: startDate,
      endDate: endDate
    });
    
    if (onFilterDate) {
      // Pass the original Date objects to parent component
      onFilterDate({ startDate, endDate });
    }
    
    if (startDate && endDate) {
      closeCalendar();
    }
  };

  const handleLocationChange = (event) => {
    setSearchLocation(event.target.value);
    if (onSearchLocation) {
      onSearchLocation(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Pencarian untuk:", searchLocation);
    }
  };

  // Get display date range string in Indonesian format
  const getDisplayDate = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const start = formatDisplayDate(dateRange.startDate);
      const end = formatDisplayDate(dateRange.endDate);
      return `${start} - ${end}`;
    }
    return "Filter";
  };

  return (
    <div className="shadow-md">
      <div className="max-w-7xl pl-4 mx-auto mt-32 font-bold text-xl flex">
        <span className="text-center font-bold text-[20px] leading-[30px]">
          Riwayat Pemesanan
        </span>
      </div>

      <div className="max-w-7xl flex pl-4 mx-auto py-3 px-4 gap-4">
        <button
          className="flex items-center space-x-4 pl-4 text-left text-white w-full bg-[#A06ECE] p-2 rounded-[12px]"
          onClick={handleBeranda}
          aria-label="Kembali ke Beranda"
        >
          <FaArrowLeft />
          <span>Beranda</span>
        </button>

        {/* Date Range Filter Button */}
        <div>
          <button
            onClick={openCalendar}
            className="flex items-center justify-center min-w-[150px] h-[32px] px-[12px] border border-purple-500 rounded-[16px] text-black space-x-2"
          >
            <img
              src="/icons/Prefix_wrapper.svg"
              alt="Filter Icon"
              className="w-6 h-6"
            />
            <span className="text-sm truncate">{getDisplayDate()}</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            <img
              src="/icons/Vector.svg"
              alt="Select From"
              onClick={() => setIsPopupOpen(true)}
              className="cursor-pointer w-8 h-8 focus:border-[#7126B5]"
            />
          </div>
        </div>
      </div>

      <ModalDateFilter
        isOpen={isCalendarOpen}
        onClose={closeCalendar}
        onSelectDate={handleDateChange}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        selectsRange={true}
      />

      <ModalLocationFilter
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        searchLocation={searchLocation}
        onLocationChange={handleLocationChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default HeaderOrder;