import React from "react";
import { motion } from "framer-motion";
import destination1 from "../../assets/images/destination.png";

const HomeCard = () => {
  return (
    <>
      <div className="grid grid-cols-5 px-[200px] gap-4">
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.20)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative flex flex-col items-center justify-center w-[166.939px] h-[194px] bg-white rounded shadow-lg p-3"
        >
          <div className="relative mb-3 w-full">
            <img
              src={destination1}
              alt="Destination Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 w-[72px] h-[24px] text-[10px] rounded-tl-xl rounded-bl-xl bg-[#A06ECE] text-center text-white flex items-center justify-center">
              Limited!
            </div>
          </div>
          <div>
            <p className="text-xs font-medium">Jakarta - Bangkok</p>
            <p className="text-[10px] text-[#7126B5] font-bold">AirAsia</p>
            <p className="text-[10px] font-medium">20 - 30 Maret 2024</p>
            <p className="text-xs font-medium">
              Mulai dari
              <span className="text-red-500 font-bold"> IDR 950.000</span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HomeCard;
