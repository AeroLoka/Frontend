import React, { useEffect, useState } from "react";
import LoggedInNavbar from "../components/Navbar/LoggedInNavbar";
import SubHeader from "../components/Header/SubHeader";
import Notification from "../components/Notification/Notification";
import TitleOfPage from "../components/Title/TitleOfPage";
import { getAllNotificationByUser, markNotificationRead } from "../services/home.service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NotificationView = () => {
  TitleOfPage("Aeroloka - Notifikasi");
  const { email } = useSelector((state) => state.userState.user);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllNotificationByUser(email);
      
      const formattedNotifications = response.data.map(notification => ({
        id: notification.id,
        type: "Notification",
        title: notification.name || "Notification",
        detail: notification.detail,
        date: notification.createdAt,
        isRead: notification.isRead
      }));

      setNotifications(formattedNotifications);
      setFilteredNotifications(formattedNotifications);
      setError(null);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Tidak ada notifikasi yang ditemukan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickNotification = async (id) => {
    try {
      await markNotificationRead(id);
      
      const updateNotification = (notificationList) =>
        notificationList.map(notification =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        );

      setNotifications(updateNotification);
      setFilteredNotifications(updateNotification);
    } catch (error) {
      toast.error(error.message || "Failed to mark notification as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const unreadNotifications = notifications.filter(notification => !notification.isRead);
      
      if (unreadNotifications.length === 0) {
        toast.info("All notifications are already read");
        return;
      }

      const loadingToast = toast.loading("Marking all notifications as read...");

      await Promise.all(
        unreadNotifications.map(notification => 
          markNotificationRead(notification.id)
        )
      );

      const markAllAsRead = (notificationList) =>
        notificationList.map(notification => ({
          ...notification,
          isRead: true
        }));

      setNotifications(markAllAsRead);
      setFilteredNotifications(markAllAsRead);
      
      toast.update(loadingToast, {
        render: "All notifications marked as read",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.error(error.message || "Failed to mark all notifications as read");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(!!query);
    
    if (!query.trim()) {
      setFilteredNotifications(notifications);
      return;
    }

    const searchResult = notifications.filter(notification =>
      notification.detail.toLowerCase().includes(query.toLowerCase()) ||
      notification.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredNotifications(searchResult);
  };

  useEffect(() => {
    getData();
  }, [email]);

  if (isLoading) {
    return (
      <>
        <LoggedInNavbar />
        <SubHeader label="Notifikasi" />
        <div className="mt-[90px] flex justify-center">
          <p>Loading notifications...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <LoggedInNavbar />
        <SubHeader label="Notifikasi" />
        <div className="mt-[90px] flex justify-center text-red-500">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <LoggedInNavbar />
      <SubHeader 
        label="Notifikasi" 
        onMarkAllRead={handleMarkAllRead}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      {filteredNotifications.length === 0 ? (
        <div className="mt-[90px] flex flex-col text-center items-center">
          {isSearching ? (
            <>
              <h2>No notifications found matching your search.</h2>
              <button 
                className="mt-4 text-purple-600 hover:text-purple-800"
                onClick={() => handleSearch("")}
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <img
                src="images/cart_shopping_list.png"
                className="w-[204px] mb-5"
                alt="Payment Status"
              />
              <h2>Belum ada notif nih.</h2>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center">
          {filteredNotifications.map((notification, index) => (
            <div 
              key={notification.id} 
              className="notification-container w-5/6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleClickNotification(notification.id)}
            >
              <Notification notification={notification} />
              {index < filteredNotifications.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationView;