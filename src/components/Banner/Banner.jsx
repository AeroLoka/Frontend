import React, { useState } from "react";

const DiscountBanner = () => {
  return (
    <>
      <div className="flex items-center mt-[148px]">
        {/* <div className=""></div>
         */}
        {/* <span className="bg-[#7126B5] w-12">ada</span> */}
        <div className="w-[236px] h-[150px] bg-[#7126B5] opacity-50 hidden sm:block"></div>

        <div className="w-full m-4 sm:m-0 p-8 sm:ps-[80px]  bg-[#FFE9CA]  text-[36px] font-[800] rounded-[20px]  sm:h-[232px]  flex items-center justify-between relative overflow-hidden sm:bg-none bg-cover bg-[url('/images/Bangkok.png')]">
          <div>
            <p className="italic ">Diskon Hari ini</p>
            <p className="text-[#7126B5]">85%</p>
          </div>

          <div className="absolute right-0 top-0 h-full hidden sm:block">
            <img src="/images/Bangkok.png" alt="" className="h-full " />

            {/* Gradient Overlay */}
            <div
              className="absolute left-0 top-0 h-full w-5/6"
              style={{
                background: "linear-gradient(to right, #FFE9CA, transparent)",
              }}
            ></div>
          </div>
        </div>
        <div className="w-[236px] h-[150px] bg-[#E2D4F0] opacity-50 hidden sm:block"></div>
      </div>
    </>
  );
};

export default DiscountBanner;
