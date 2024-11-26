import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeaderTicket from "../components/Header/HeaderTicket";
import NavigationDates from "../components/Navbar/NavigationDates";
import FilterButton from "../components/Filter/FilterButton";
import FilterSection from "../components/Filter/FilterSection";
import ResultsSection from "../components/Results/ResultSection";

const DetailTicket = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-[100px] gap-2">
        <HeaderTicket />
        <NavigationDates />
        <div className="w-full md:w-4/5 mx-auto border-t-2 border-gray-300 mt-5 px-4"></div>
        <FilterButton />
        <main className="w-full md:w-4/5 mx-auto mt-8 flex flex-col md:flex-row">
          <FilterSection />
          <ResultsSection loading={loading} />
        </main>
      </div>
    </>
  );
};

export default DetailTicket;
