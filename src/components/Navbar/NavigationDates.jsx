import React, { useState } from "react";

const NavigationDates = () => {
  const searchDetails = "JKT > MLB - 2 Penumpang - Economy";
  const [activeIndex, setActiveIndex] = useState(1); // Index aktif (default elemen ke-2)
  const [startIndex, setStartIndex] = useState(0); // Index elemen pertama yang terlihat

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

  // Fungsi untuk navigasi elemen ke kiri
  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  // Fungsi untuk navigasi elemen ke kanan
  const scrollRight = () => {
    setStartIndex((prev) => Math.min(dates.length - 7, prev + 1));
  };

  return (
    <div className="w-full md:w-4/5 mx-auto px-4 my-4">
      {/* Kotak Pencarian */}
      <div className="flex items-center justify-between gap-2">
        {/* Kotak Kiri */}
        <div className="w-full md:w-4/5 bg-purple-400 rounded-xl p-3 flex items-center hover:bg-purple-600 text-white shadow-lg mb-3 md:mb-0">
          {/* Tombol Kembali */}
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
          {/* Hasil Pencarian */}
          <div className="flex-1 font-medium truncate ml-4 text-white">
            {searchDetails}
          </div>
        </div>
        {/* Kotak Kanan (Ubah Pencarian) */}
        <button className="whitespace-nowrap text-sm font-medium transition-colors bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 hover:text-white h-9 w-full md:w-1/5 rounded-xl p-6 flex items-center justify-center text-white">
          <span className="text-sm font-bold">Ubah Pencarian</span>
        </button>
      </div>

      {/* Navigation Dates */}
      <div className="flex items-center justify-between mt-8 gap-2 w-full">
        {/* Tombol Scroll Kiri */}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-purple-600 shadow-lg shadow-purple-500/50 hover:bg-purple-600 h-9 px-4 py-2 text-gray-600 hover:text-black"
          onClick={scrollLeft}
          disabled={startIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left w-5 h-5 text-white"
          >
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
        </button>

        {/* Elemen Tanggal */}
        <div className="flex gap-8 overflow-hidden">
          {dates.slice(startIndex, startIndex + 7).map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(startIndex + index)} // Set index aktif saat diklik
              className={`flex flex-col items-center justify-center w-[120px] h-[60px] rounded-[8px] cursor-pointer transition-all ${
                activeIndex === startIndex + index
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              <span
                className={`font-bold text-sm ${
                  activeIndex === startIndex + index
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {item.day}
              </span>
              <span className="text-xs">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Tombol Scroll Kanan */}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-purple-600 shadow-lg shadow-purple-500/50 hover:bg-purple-600 h-9 px-4 py-2 text-gray-600 hover:text-black"
          onClick={scrollRight}
          disabled={startIndex + 7 >= dates.length}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right w-5 h-5 text-white"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavigationDates;
