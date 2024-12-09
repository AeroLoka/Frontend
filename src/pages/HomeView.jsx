import React from "react";
import { useSelector } from "react-redux";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";

const HomeView = () => {
  const { user } = useSelector((state) => state.userState);
  return (
    <>
      {user ? <LoggedInNavbar /> : <Navbar />}
      <section>
        <div className="relative">
          <DiscountBanner />
        </div>
        <div className="">
          <SearchFlight />
        </div>
      </section>
      <section className="container relative mx-auto pt-72 mb-20">
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
