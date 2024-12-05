import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const defaultValue = {
    pemesan: {
        booking_name: "",
        booking_last_name: "",
        phone_number: "",
        email: "",
        hasLastName: false
    },
    passengers: [],
    submissionTime: null,
    totalPassengers: 0
};

const getBookingFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("booking")) || defaultValue;
}

const bookingSlice = createSlice({
    name: "booking",
    initialState: getBookingFromLocalStorage(),
    reducers: {
        addBooking: (state, action) => {
            const { passengers, ...pemesanData } = action.payload;
            state.pemesan = pemesanData;
            state.passengers = passengers;
            state.totalPassengers = passengers.length;
            state.submissionTime = new Date().toISOString();
            localStorage.setItem("booking", JSON.stringify(state));
            toast.success(`Booking saved successfully`);
        }
    }
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;