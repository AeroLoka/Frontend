import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import FormSkeleton from "../components/skeletons/FormSkeleton";
import { getAllFlights } from "../services/home.service";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";
import Pagination from "../components/Pagination/Pagination";

const HomeView = () => {
  const { user } = useSelector((state) => state.userState);
  const limit = 5;
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    try {
      const response = await getAllFlights({ page, limit });
      setFlights(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [page]);

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

      <section className="container mx-auto">
        <div>
          <h2 className="text-xl font-bold mb-4 px-8 pt-96 mt-40 md:pt-72 md:px-0 lg:pt-24">
            Destinasi Favorit
          </h2>
          <SearchDestination />
          <HomeCard flights={flights} />

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
