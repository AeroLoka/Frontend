import React, { useEffect, useState } from "react";
import ButtonScroll from "../Button/ButtonScroll";
import ButtonChange from "../Button/ButtonChange";

const NavigationDates = ({ onDateClick }) => {
  const searchDetails = "JKT > MLB - 2 Penumpang - Economy";
  const [activeIndex, setActiveIndex] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const dates = [
    { day: "Selasa", date: "01/03/2023" },
    { day: "Rabu", date: "02/03/2023" },
    { day: "Kamis", date: "03/03/2023" },
    { day: "Jumat", date: "04/03/2023" },
    { day: "Sabtu", date: "05/03/2023" },
    { day: "Minggu", date: "06/03/2023" },
    { day: "Senin", date: "07/03/2023" },
    { day: "Selasa", date: "08/03/2023" },
    { day: "Rabu", date: "09/03/2023" },
  ];

  // const [searchDetails, setSearchDetails] = useState("");
  // const [dates, setDates] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(1);
  // const [startIndex, setStartIndex] = useState(0);

  // useEffect(() => {
  //   const fetchSearchDetails = async () => {
  //     try {
  //       const response = await fetch("/api/search-flights");
  //       const data = await response.json();

  //       // Set data yang diterima dari API
  //       setSearchDetails(data.searchDetails || "Flight Details Unavailable");
  //       setDates(
  //         data.dates.map((date) => ({
  //           day: date.day,
  //           date: date.date,
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("Error fetching search details:", error);
  //     }
  //   };

  //   fetchSearchDetails();
  // }, []);

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setStartIndex((prev) => Math.min(dates.length - 7, prev + 1));
  };

  const handleDateClick = (index, date) => {
    setActiveIndex(index);
    onDateClick(date);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto px-4 my-4">
      <div className="flex items-center justify-between gap-8">
        <div className="w-[1650px] h-[50px] bg-purple-400 rounded-xl p-3 flex items-center hover:bg-purple-600 text-white shadow-lg mb-3 md:mb-0">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
          <div className="flex-1 font-medium truncate ml-4 text-white">
            {searchDetails}
          </div>
        </div>
        <div className="md:w-1/2">
          <ButtonChange />
        </div>
      </div>

      {/* Navigation Dates */}
      <div className="flex items-center justify-between mt-8 gap-2 w-full">
        <ButtonScroll
          direction="left"
          onClick={scrollLeft}
          disabled={startIndex === 0}
        />

        {/* Elemen Tanggal */}
        <div className="flex gap-8 overflow-x-auto scrollbar-hide items-center justify-center w-full sm:overflow-hidden">
          {dates.slice(startIndex, startIndex + 7).map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(startIndex + index, item.date)}
              className={`flex flex-col items-center justify-center w-[120px] h-[60px] rounded-[8px] cursor-pointer transition-all ${
                activeIndex === startIndex + index
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
              style={{
                minWidth: "120px",
                maxWidth: "120px",
                minHeight: "60px",
                maxHeight: "60px",
              }}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-sm">{item.day}</span>
                <span className="text-xs">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        <ButtonScroll
          direction="right"
          onClick={scrollRight}
          disabled={startIndex + 7 >= dates.length}
        />
      </div>
    </div>
  );
};

export default NavigationDates;
