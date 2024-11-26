import React from "react";

const FilterButton = () => {
  return (
    <div className="w-full md:w-4/5 mx-auto mt-5 flex items-center justify-end mb-7 px-4">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus:outline-none bg-purple-400 focus:ring-4 focus:ring-purple-400 text-white shadow-lg shadow-purple-500/50 hover:bg-violet-600 hover:text-white h-9 px-4 py-2 rounded-full bg-primaryPurple"
        type="button"
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
          className="lucide lucide-arrow-up-down w-5 h-5 mr-2"
        >
          <path d="m21 16-4 4-4-4"></path>
          <path d="M17 20V4"></path>
          <path d="m3 8 4-4 4 4"></path>
          <path d="M7 4v16"></path>
        </svg>
        <span className="text-sm font-medium leading-none cursor-pointer">
          Filter
        </span>
      </button>
    </div>
  );
};

export default FilterButton;
