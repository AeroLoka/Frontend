import React, { useEffect, useState } from "react";
import { getAllFlights } from "../../services/home.service.js";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaPlaneDeparture,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import destination1 from "../../assets/images/destination.png";

const formatDateRange = (startDate, endDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const start = new Date(startDate).toLocaleDateString("id-ID", options);
  const end = new Date(endDate).toLocaleDateString("id-ID", options);
  return `${start.split(" ")[0]} - ${end.split(" ")[0]} ${end.split(" ")[1]} ${
    end.split(" ")[2]
  }`;
};

const HomeCard = ({ flights }) => {
  // const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     try {
  //       const response = await getAllFlights({ limit: 5, page: 1 });
  //       setFlights(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchFlights();
  // }, []);

  return (
    <>
      <div className="grid grid-cols-1 px-8 pt-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:px-20">
        {flights.map((flight) =>
          flight.originCity && flight.destinationCity && flight.airlines ? (
            <motion.div
              key={
                flight.id ||
                flight.originCity.name + flight.destinationCity.name
              }
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.20)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-start justify-center px-3 py-5 bg-white rounded-lg shadow-lg"
            >
              <div className="relative mb-3 w-full h-auto rounded-lg">
                <img
                  src={destination1}
                  alt={`${flight.originCity.name} - ${flight.destinationCity.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 w-[50%] h-[25%] text-base font-medium rounded-tl-xl rounded-bl-xl bg-[#A06ECE] text-center text-white flex items-center justify-center lg:text-xs">
                  Limited!
                </div>
              </div>

              <div className="flex flex-col gap-0.5 text-left w-full md:gap-1.5">
                <p className="text-base font-semibold flex flex-wrap items-center md:text-sm">
                  <MdLocationOn className="mr-1 text-xl text-[#7126B5] md:text-lg" />
                  {flight.originCity.name}{" "}
                  <FaArrowRight className="mx-1 text-[#7126B5]" />{" "}
                  {flight.destinationCity.name}
                </p>
                <p className="text-case text-[#7126B5] font-bold flex items-center md:text-sm">
                  <FaPlaneDeparture className="mr-2 text-lg md:text-sm" />
                  {flight.airlines.name}
                </p>
                <p className="text-xs font-medium flex items-center">
                  <FaCalendarAlt className="mr-2 text-sm text-[#7126B5]" />
                  {formatDateRange(flight.departure, flight.return)}
                </p>
                <p className="text-xs font-medium flex items-center md:text-xs">
                  <FaDollarSign className="mr-2 text-sm text-[#7126B5]" />
                  Mulai dari{" "}
                  <span className="text-red-500 font-bold">
                    IDR {flight.price.toLocaleString()}
                  </span>
                </p>
              </div>
            </motion.div>
          ) : null
        )}
      </div>
    </>
  );
};

export default HomeCard;
