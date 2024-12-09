import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className="notification-item">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src="icons/notification.svg" alt="" className="w-6 h-6" />
          <p className="text-[#8A8A8A] text-[14px]">{notification.type}</p>
        </div>
        <p className="text-[#8A8A8A] text-[14px]">
          {new Date(notification.date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
          })}
          ,{" "}
          {new Date(notification.date).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
      </div>

      <div className="ml-10">
        <p className="font-[400] text-[16px]">{notification.title}</p>

        <p className="text-[14px] text-[#8A8A8A]">{notification.detail}</p>
      </div>
    </div>
  );
};

export default Notification;
