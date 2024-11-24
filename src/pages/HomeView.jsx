import React from "react";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";

const HomeView = () => {
  return (
    <>
      <Navbar />

      <section>
        <div className="pt-40 text-3xl font-bold underline">HomeView</div>
      </section>

      {/* <FormSkeleton height="h-96" width="w-96"/> */}
    </>
  );
};

export default HomeView;
