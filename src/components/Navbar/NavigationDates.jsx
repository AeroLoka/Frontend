import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDays, format, parseISO, startOfMonth, isValid } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";
import ButtonScroll from "../Button/ButtonScroll";
import ButtonChange from "../Button/ButtonChange";

const NavigationDates = ({ onDateClick, tickets }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [searchDetails, setSearchDetails] = useState("");
  const [dates, setDates] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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

      if (departureDate && isValid(parseISO(departureDate))) {
        departureDateObj = parseISO(departureDate);
      } else {
        departureDateObj = new Date();
      }

      // Start from the beginning of the month
      const monthStart = startOfMonth(departureDateObj);
      const generatedDates = getNextDates(monthStart, 60); // Generate 60 days worth of dates
      setDates(generatedDates);

      // Find and set the active index based on the departure date
      const departureIndex = generatedDates.findIndex(
        (dateObj) => format(dateObj.dateObj, 'yyyy-MM-dd') === format(departureDateObj, 'yyyy-MM-dd')
      );
      
      if (departureIndex !== -1) {
        setActiveIndex(departureIndex);
        // Set startIndex to show the active date in view
        setStartIndex(Math.max(0, Math.min(departureIndex, generatedDates.length - 7)));
      }
    }
  }, [tickets, location]);

  const getNextDates = (startingDate = new Date(), count = 60) => {
    try {
      const dates = [];
      let currentDate = startingDate;

      for (let i = 0; i < count; i++) {
        if (isValid(currentDate)) {
          dates.push({
            day: format(currentDate, "EEEE"),
            date: format(currentDate, "dd/MM/yyyy"),
            dateObj: currentDate,
            isoDate: format(currentDate, "yyyy-MM-dd")
          });
        }
        currentDate = addDays(currentDate, 1);
      }
      return dates;
    } catch (e) {
      console.error('Error generating dates:', e);
      return [];
    }
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      const firstDate = dates[0].dateObj;
      const newDates = getNextDates(addDays(firstDate, -30), 30);
      setDates([...newDates, ...dates]);
      setStartIndex(29);
      setActiveIndex(activeIndex + 30);
    }
  };

  const scrollRight = () => {
    if (startIndex + 7 < dates.length) {
      setStartIndex(startIndex + 1);
    } else {
      const lastDate = dates[dates.length - 1].dateObj;
      const newDates = getNextDates(addDays(lastDate, 1), 30);
      setDates([...dates, ...newDates]);
    }
  };

  const handleDateClick = (index, date, isoDate) => {
    setActiveIndex(index);
    
    try {
      const dateObj = parseISO(isoDate);
      if (!isValid(dateObj)) {
        console.error('Invalid date selected');
        return;
      }

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('departureDate', isoDate);

      const returnDate = searchParams.get('returnDate');
      if (returnDate) {
        const returnDateObj = parseISO(returnDate);
        if (isValid(returnDateObj) && returnDateObj < dateObj) {
          searchParams.set('returnDate', isoDate);
        }
      }

      navigate({
        pathname: location.pathname,
        search: searchParams.toString()
      }, { replace: true });

      onDateClick(isoDate);
    } catch (e) {
      console.error('Error handling date click:', e);
    }
  };

  // Rest of the return statement remains the same
  return (
    <div className="w-full md:w-4/5 mx-auto px-4 my-4">
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
        <ButtonScroll direction="left" onClick={scrollLeft} />

        <div className="flex gap-5 overflow-x-auto scrollbar-hide items-center justify-center w-full sm:overflow-hidden ms-10">
          {dates.slice(startIndex, startIndex + 7).map((item, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(startIndex + index, item.date, item.isoDate)}
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

        <ButtonScroll direction="right" onClick={scrollRight} />
      </div>
    </div>
  );
};

export default NavigationDates;