import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import SkeletonCard from "../components/skeletons/SkeletonCard";
import { getAllFlights } from "../services/home.service";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import HomeCard from "../components/Card/HomeCard";
import SearchDestination from "../components/Button/SearchButton";
import DiscountBanner from "../components/Banner/Banner";
import SearchFlight from "../components/Flight/SearchFlight";
import Pagination from "../components/Pagination/Pagination";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const HomeView = () => {
  const { user } = useSelector((state) => state.userState);
  const limit = 10;
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [continent, setContinent] = useState("semua");
  const [noDataFound, setNoDataFound] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryContinent = queryParams.get("continent");

  useEffect(() => {
    if (queryContinent) {
      setContinent(queryContinent);
    } else {
      setContinent("semua");
    }
  }, [location.search]);

  useEffect(() => {
    setFlights([]);
    setPage(1);
    // setLoading(true);
    fetchFlights();
  }, [continent]);

  const fetchFlights = async () => {
    try {
      const response = await getAllFlights({ page, limit, continent });
      if (response.data.length === 0) {
        setNoDataFound(true);
      } else {
        setFlights(response.data);
        setTotalPages(response.meta.totalPages);
        setNoDataFound(false);
      }
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchFlights();
    // setLoading(true);
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
          <SearchDestination onContinentChange={setContinent} />
          {noDataFound ? (
            <p className="text-center text-lg text-gray-500">
              Tidak ada penerbangan ditemukan untuk benua {continent}.
            </p>
          ) : (
            <HomeCard flights={flights} />
          )}

          <Pagination
            currPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* <SkeletonCard /> */}
    </>
  );
};

export default HomeView;
