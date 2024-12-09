import React, { useEffect, useState } from "react";
// import FormSkeleton from "../components/skeletons/FormSkeleton";
import { getAllFlights } from "../services/home.service";
import Navbar from "../components/Navbar/Navbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";
import Pagination from "../components/Pagination/Pagination";

const HomeView = () => {
  const limit = 5;
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const totalPages = Math.ceil(flights.length / limit);
  const currPageData = flights.slice(offset, offset + limit);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        setFlights(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [page]);

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
          <h2 className="text-xl font-bold mb-4 px-10 lg:px-40">
            Destinasi Favorit
          </h2>
          <SearchDestination />
          <HomeCard flights={currPageData} />

          <Pagination
            currPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </section>

      {/* <FormSkeleton height="h-96" width="w-96"/> */}
    </>
  );
};

export default HomeView;
