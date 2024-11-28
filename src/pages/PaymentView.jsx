import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar/Navbar";
import Stage from "../components/navbar/Stage";
import DetailPenerbangan from "../components/Section/DetailPenerbangan";

const PaymentView = () => {
    const insertSnapScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute(
                "data-client-key",
                import.meta.env.VITE_CLIENT_MIDTRANS
            );
            script.onload = () => resolve();
            document.body.appendChild(script);
        });
    };

    const pay = async () => {
        try {
            const response = await axiosInstance.post("/orders");

            const { token } = response.data;
            console.log(token.token);
            window.snap.embed(token.token, {
                embedId: "snap-container",
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    alert("payment success!");
                    console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("wating your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("payment failed!");
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        insertSnapScript();
        pay();
    }, []);
    return (
        <div>
            <Navbar />
            <Stage stage2={''} />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="w-[600px] h-[500px]" id="snap-container"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6">
                            <h2 className="font-bold text-xl mb-4">
                                Detail Penerbangan
                            </h2>
                            <DetailPenerbangan
                                departure_time="07:00"
                                departure_date="27 November 2024"
                                departure_airport="Soekarno-Hatta"
                                return_time="11:00"
                                return_date="27 November 2024"
                                return_airport="Melbourne International Airport"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentView;
