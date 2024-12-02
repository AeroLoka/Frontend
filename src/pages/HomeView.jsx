import React, { useState } from "react";
import FormSkeleton from "../components/skeletons/FormSkeleton";
import Navbar from "../components/Navbar/Navbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";
import Pagination from "../components/Pagination/Pagination";

const HomeView = () => {

  const limit = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // const totalPages = Math.ceil(data.length / limit);
  // const currPageData = data.slice(offset, offset + limit);

  return (
    <>
      <Navbar />

      <section>
        <div className="relative">
          <DiscountBanner />
        </div>
        <div className="">
          <SearchFlight />
        </div>
      </section>

      <section className="container relative mx-auto pt-72">
        <div>
          <h2 className="text-base font-bold px-[200px] mb-4">
            Destinasi Favorit
          </h2>
          <SearchDestination />
          <HomeCard />
          
          <Pagination
            // currPage={page}
            // totalPages={totalPages}
            // onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </section>

      {/* <FormSkeleton height="h-96" width="w-96"/> */}
    </>
  );
};

export default HomeView;
