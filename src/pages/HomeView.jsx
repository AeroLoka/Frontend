import React from "react";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";

const HomeView = () => {
  return (
    <>
      <Navbar />

      <section className="container mx-auto relative pt-[84px]">
        {/* <div className="pt-40 text-3xl font-bold underline">HomeView</div> */}
        <DiscountBanner />

        <div>
          <h2 className="text-base font-bold px-[200px] mb-4 mt-8">
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
