import React, { useEffect, useState } from "react";
import ButtonScroll from "../Button/ButtonScroll";
import ButtonChange from "../Button/ButtonChange";
import { useLocation } from "react-router-dom";
import { addDays, format, parseISO } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";

const NavigationDates = ({ onDateClick, tickets }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [searchDetails, setSearchDetails] = useState("");
  const [dates, setDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const departureDate = queryParams.get("departureDate");
    const adult = parseInt(queryParams.get("adult")) || 0;
    const child = parseInt(queryParams.get("child")) || 0;
    const infant = parseInt(queryParams.get("infant")) || 0;

    const passengerCount = adult + child + infant;

    if (tickets && tickets.length > 0) {
      const ticket = tickets[0];

      const from = ticket.originCity?.shortname;
      const to = ticket.destinationCity?.shortname;
      const seatClass = ticket.class;

      setSearchDetails(
        `${from} > ${to} - ${passengerCount} Penumpang - ${seatClass}`
      );

      let departureDateObj;

      if (departureDate) {
        departureDateObj = parseISO(departureDate);
      } else {
        departureDateObj = new Date();
      }
      const generatedDates = getNextDates(departureDateObj, 60);
      setDates(generatedDates);

      const departureIndex = generatedDates.findIndex(
        (dateObj) => dateObj.dateObj.getTime() === departureDateObj.getTime()
      );
      if (departureIndex !== -1) {
        setActiveIndex(departureIndex);
      }
    }
  }, [tickets, location]);

  const getNextDates = (startingDate = new Date(), count = 30) => {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const currentDate = addDays(startingDate, i);
      dates.push({
        day: format(currentDate, "EEEE"),
        date: format(currentDate, "dd/MM/yyyy"),
        dateObj: currentDate,
      });
    }
    return dates;
  };

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(0, prev - 7));
  };

  const scrollRight = () => {
    const lastIndex = dates.length - 1;
    const newIndex = startIndex + 7;
    if (newIndex >= dates.length) {
      const nextStartDate = addDays(dates[lastIndex].dateObj, 1);
      const newDates = getNextDates(nextStartDate, 30);
      setDates([...dates, ...newDates]);
    }
    setStartIndex((prev) => Math.min(dates.length - 7, prev + 7));
  };

  const handleDateClick = (index, date) => {
    setActiveIndex(index);
    onDateClick(date);
  };

  return (
    <div className="w-full md:w-4/5 mx-auto px-4 my-4 ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <a href="/">
          <div className="w-full h-[50px] flex bg-[#A06ECE] items-center rounded-xl p-3 shadow-lg md:mb-0 hover:bg-[#7126B5]">
            <FiArrowLeft size={25} className="me-3 text-white" />
            <div className="font-medium text-sm text-white md:text-base">
              {searchDetails}
            </div>
          </div>
        </a>
        <div className="">
          <ButtonChange />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 gap-4 w-full md:gap-2">
        <ButtonScroll
          direction="left"
          onClick={scrollLeft}
          disabled={startIndex === 0}
        />

        <div className="flex gap-5 overflow-x-auto scrollbar-hide items-center justify-center w-full sm:overflow-hidden">
          {dates.slice(startIndex, startIndex + 7).map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(startIndex + index, item.date)}
              className={`flex flex-col items-center justify-center w-[120px] h-[60px] rounded-[8px] cursor-pointer transition-all ${
                activeIndex === startIndex + index
                  ? "bg-[#7126B5] text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-[#7126B5] hover:text-white"
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
