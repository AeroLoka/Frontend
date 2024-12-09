import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPassenger from "../components/form/FormPassenger";
import FormPemesan from "../components/form/FormPemesan";
import DetailPenerbangan from "../components/Section/DetailPenerbangan";
import Navbar from "../components/Navbar/Navbar";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";

import Stage from "../components/navbar/Stage";
import SeatSelection from "../components/Section/SeatSection";
import { addBooking } from "../features/bookingSlice";
import { useDispatch } from "react-redux";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(
      mins % 60
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const [passengerCount, setPassengerCount] = useState(2);

  const methods = useForm({
    defaultValues: {
      passengers: Array.from({ length: passengerCount }, () => ({
        first_name: "",
        last_name: "",
        birth_date: "",
        nationality: "",
        ktp_number: "",
        passport: "",
        negara_penerbit: "",
        berlaku_sampai: "",
        selected_seat: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "passengers",
  });

  const onSubmit = (formData) => {
    const unassignedPassengers = formData.passengers.filter(
      (p) => !p.selected_seat
    );

    if (unassignedPassengers.length > 0) {
      toast.error("Please assign seats to all passengers");
      return;
    }

    const { passengers, ...pemesanData } = formData;

    dispatch(
      addBooking({
        ...pemesanData,
        passengers: passengers,
      })
    );
    navigate("/payment");
  };

  return (
    <>
      {/* <Navbar /> */}
      <LoggedInNavbar />
      <Stage>
        <div className="text-white bg-red-500 p-2 rounded-lg text-center">
          Selesaikan dalam {formatTime(timeLeft)}
        </div>
      </Stage>
      <FormProvider {...methods}>
        <div className="max-w-7xl mx-auto p-4">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-bold text-xl mb-4">Isi Data Pemesan</h2>
                <FormPemesan />
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h2 className="font-bold text-xl mb-4">Isi Data Penumpang</h2>
                {fields.map((field, index) => (
                  <FormPassenger key={field.id} index={index} />
                ))}
              </div>
              <SeatSelection />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-bold text-xl mb-4">Detail Penerbangan</h2>
                <DetailPenerbangan
                  departure_time="07:00"
                  departure_date="27 November 2024"
                  departure_airport="Soekarno-Hatta"
                  return_time="11:00"
                  return_date="27 November 2024"
                  return_airport="Melbourne International Airport"
                />
              </div>

              <div className="w-[95%] mx-auto">
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Lanjut Bayar
                </button>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};

export default OrderPage;
