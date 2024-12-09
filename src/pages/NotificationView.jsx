import React, { useState } from "react";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import SubHeader from "../components/Header/SubHeader";
import Notification from "../components/Notification/Notification";
const PaymentStatusPage = () => {
  // dummy data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Promosi",
      title: "Dapatkan Potongan 50% Tiket!",
      detail: "Syarat dan Ketentuan berlaku!",
      date: "2024-12-09T14:00:00Z",
    },
    {
      id: 2,
      type: "Notifikasi",
      title:
        "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
      detail: "",
      date: "2024-12-08T10:00:00Z",
    },
  ]);

  return (
    <>
      <LoggedInNavbar />
      <SubHeader label="Notifikasi"></SubHeader>
      {notifications.length === 0 ? (
        <div className="mt-[90px] flex flex-col text-center items-center">
          <img
            src="images/cart_shopping_list.png"
            className="w-[204px] mb-5"
            alt="Payment Status"
          />
          <h2>Belum ada notif nih.</h2>
        </div>
      ) : (
        <div className="mt-[90px] flex flex-col  items-center">
          {notifications.map((notification, index) => (
            <div key={notification.id} className="notification-container w-5/6">
              <Notification notification={notification} />

              {index < notifications.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PaymentStatusPage;
