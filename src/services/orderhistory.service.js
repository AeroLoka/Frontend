import axiosInstance from "../api/axiosInstance";

const getAllBookingsByUserId = async (
  userId,
  from = null,
  to = null,
  bookingCode = null
) => {
  try {
    const queryParams = {};
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;
    if (bookingCode) queryParams.bookingCode = bookingCode;

    const response = await axiosInstance.get(`/booking/${userId}`, {
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw (
        error.response.data || { message: "An error occurred with the API." }
      );
    } else {
      throw {
        message: error.message || "Network error or something went wrong.",
      };
    }
  }
};

export { getAllBookingsByUserId };
