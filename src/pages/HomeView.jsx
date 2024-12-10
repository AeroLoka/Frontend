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

  // useEffect(() => {
  //   const fetchFlights = async () => {
  //     try {
  //       const response = await getAllFlights();
  //       setFlights(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFlights();
  // }, [page]);

  const dummyFlights = [
    {
      id: 1,
      originCity: { name: "Jakarta" },
      destinationCity: { name: "Bali" },
      airlines: { name: "Garuda Indonesia" },
      departure: "2024-12-15T10:00:00Z",
      return: "2024-12-20T18:00:00Z",
      price: "1,200,000",
    },
    {
      id: 2,
      originCity: { name: "Surabaya" },
      destinationCity: { name: "Medan" },
      airlines: { name: "Lion Air" },
      departure: "2024-12-18T14:00:00Z",
      return: "2024-12-23T20:00:00Z",
      price: "950,000",
    },
    {
      id: 3,
      originCity: { name: "Bali" },
      destinationCity: { name: "Jakarta" },
      airlines: { name: "AirAsia" },
      departure: "2024-12-10T06:00:00Z",
      return: "2024-12-15T12:00:00Z",
      price: "1,100,000",
    },
    {
      id: 4,
      originCity: { name: "Bandung" },
      destinationCity: { name: "Semarang" },
      airlines: { name: "Citilink" },
      departure: "2024-12-13T08:00:00Z",
      return: "2024-12-18T15:00:00Z",
      price: "800,000",
    },
    {
      id: 5,
      originCity: { name: "Yogyakarta" },
      destinationCity: { name: "Malang" },
      airlines: { name: "Sriwijaya Air" },
      departure: "2024-12-14T09:00:00Z",
      return: "2024-12-19T16:00:00Z",
      price: "700,000",
    },
    {
      id: 6,
      originCity: { name: "Palembang" },
      destinationCity: { name: "Batam" },
      airlines: { name: "Garuda Indonesia" },
      departure: "2024-12-11T12:00:00Z",
      return: "2024-12-16T17:00:00Z",
      price: "1,300,000",
    },
    {
      id: 7,
      originCity: { name: "Pekanbaru" },
      destinationCity: { name: "Padang" },
      airlines: { name: "Lion Air" },
      departure: "2024-12-12T07:00:00Z",
      return: "2024-12-17T14:00:00Z",
      price: "600,000",
    },
    {
      id: 8,
      originCity: { name: "Banda Aceh" },
      destinationCity: { name: "Medan" },
      airlines: { name: "AirAsia" },
      departure: "2024-12-13T10:00:00Z",
      return: "2024-12-18T18:00:00Z",
      price: "500,000",
    },
    {
      id: 9,
      originCity: { name: "Makassar" },
      destinationCity: { name: "Manado" },
      airlines: { name: "Citilink" },
      departure: "2024-12-14T11:00:00Z",
      return: "2024-12-19T19:00:00Z",
      price: "900,000",
    },
    {
      id: 10,
      originCity: { name: "Balikpapan" },
      destinationCity: { name: "Samarinda" },
      airlines: { name: "Sriwijaya Air" },
      departure: "2024-12-15T13:00:00Z",
      return: "2024-12-20T20:00:00Z",
      price: "800,000",
    },
    {
      id: 11,
      originCity: { name: "Kupang" },
      destinationCity: { name: "Labuan Bajo" },
      airlines: { name: "Garuda Indonesia" },
      departure: "2024-12-16T08:00:00Z",
      return: "2024-12-21T14:00:00Z",
      price: "1,500,000",
    },
    {
      id: 12,
      originCity: { name: "Denpasar" },
      destinationCity: { name: "Lombok" },
      airlines: { name: "Lion Air" },
      departure: "2024-12-17T09:00:00Z",
      return: "2024-12-22T16:00:00Z",
      price: "600,000",
    },
    {
      id: 13,
      originCity: { name: "Pontianak" },
      destinationCity: { name: "Palangkaraya" },
      airlines: { name: "AirAsia" },
      departure: "2024-12-18T10:00:00Z",
      return: "2024-12-23T17:00:00Z",
      price: "700,000",
    },
    {
      id: 14,
      originCity: { name: "Tarakan" },
      destinationCity: { name: "Banjarmasin" },
      airlines: { name: "Citilink" },
      departure: "2024-12-19T12:00:00Z",
      return: "2024-12-24T19:00:00Z",
      price: "800,000",
    },
    {
      id: 15,
      originCity: { name: "Jayapura" },
      destinationCity: { name: "Biak" },
      airlines: { name: "Sriwijaya Air" },
      departure: "2024-12-20T14:00:00Z",
      return: "2024-12-25T20:00:00Z",
      price: "1,200,000",
    },
  ];

  useEffect(() => {
    setFlights(dummyFlights);
  }, []);

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
