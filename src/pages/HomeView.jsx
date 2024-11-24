import React from "react";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";
import HomeCard from "../components/Card/HomeCard";

const HomeView = () => {
  return (
    <>
      <Navbar />

      <section className="container mx-auto">
        <div className="pt-40 text-3xl font-bold underline">HomeView</div>
        <HomeCard />
      </section>

      {/* <FormSkeleton height="h-96" width="w-96"/> */}
    </>
  );
};

export default HomeView;
