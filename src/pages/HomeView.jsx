import React from "react";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/Search";

const HomeView = () => {
  return (
    <>
      <Navbar />

      <section className="container mx-auto">
        <div className="pt-40 text-3xl font-bold underline">HomeView</div>

        <div>
          <h2 className="text-base font-bold px-[200px] mb-4">
            Destinasi Favorit
          </h2>
          <SearchDestination />
          <HomeCard />
        </div>
      </section>

      {/* <FormSkeleton height="h-96" width="w-96"/> */}
    </>
  );
};

export default HomeView;
