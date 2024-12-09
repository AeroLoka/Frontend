import React, { useEffect, useState } from "react";
import { getAllFlights } from "../../services/home.service.js";
import { motion } from "framer-motion";
import destination1 from "../../assets/images/destination.png";

const HomeCard = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights({ limit: 5, page: 1 });
        setFlights(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 px-8 pt-2 gap-4 lg:grid-cols-5 lg:px-40">
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
              className="relative flex flex-col items-center justify-center px-2 py-5 bg-white rounded shadow-lg p-3"
            >
              <div className="relative mb-3 w-full">
                <img
                  src={destination1}
                  alt={`${flight.originCity.name} - ${flight.destinationCity.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 w-[50%] h-[25%] text-xs font-medium rounded-tl-xl rounded-bl-xl bg-[#A06ECE] text-center text-white flex items-center justify-center">
                  Limited!
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold lg:text-md">
                  {flight.originCity.name} - {flight.destinationCity.name}
                </p>
                <p className="text-sm text-[#7126B5] font-bold lg:text-md">
                  {flight.airlines.name}
                </p>
                <p className="text-xs font-medium">
                  {new Date(flight.departure).toLocaleDateString()} -{" "}
                  {new Date(flight.return).toLocaleDateString()}
                </p>
                <p className="text-xs font-medium">
                  Mulai dari
                  <span className="text-red-500 font-bold">
                    {" "}
                    IDR {flight.price}
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
