import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import Stepper from "../components/Stepper/Stepper";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import TitleOfPage from "../components/Title/TitleOfPage";
import { sendTicket } from "../services/transaction.service";
import { useSelector } from "react-redux";

const PaymentStatusPage = () => {
  const navigate = useNavigate();
  const {email} = useSelector((state) => state.userState.user);

  TitleOfPage("Aeroloka - Status Pembayaran");
  const [searchParams] = useSearchParams();
  const bookingCode = searchParams.get("booking-code");

  // dummy
  const handleClick = async() => {
    try {
      const response = await sendTicket({email, bookingCode});
      toast.success("Tiket berhasil dikirim ke email Anda!")
    } catch (error) {
      toast.error(error.message || "Failed to load orders");
    }
    
  }

  return (
    <>
      <LoggedInNavbar />
      <Stepper />
      <div className="mt-[90px] flex flex-col text-center items-center">
        <img
          src="images/cart_shopping_list.png"
          className="w-[204px] mb-5"
          alt="Payment Status"
        />
        <div className="mb-12">
            <>
              <p className="text-[#7126B5] text-[14px] font-[500]">Selamat!</p>
              <p className="text-[14px] font-[500]">
                Transaksi Pembayaran Tiket Sukses!
              </p>
            </>
        </div>
          <>
            <button onClick={handleClick} className="w-[347px] py-2 bg-[#7126B5] text-white text-base font-[500] rounded-xl hover:bg-[#5c109c] mb-3">
              Terbitkan Tiket
            </button>

            <button
              className="w-[347px] py-2 bg-[#D0B7E6] text-white text-base font-[500] rounded-xl hover:bg-[#9e83b5] mb-3"
              onClick={() => navigate("/")}
            >
              Cari Penerbangan Lain
            </button>
          </>
        
      </div>
    </>
  );
};

export default PaymentStatusPage;
