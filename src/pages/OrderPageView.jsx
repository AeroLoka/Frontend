import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import FormPassenger from "../components/form/FormPassenger";
import FormPemesan from "../components/form/FormPemesan";
import DetailPenerbangan from "../components/Section/DetailPenerbangan";
import Navbar from "../components/Navbar/Navbar";
import Stage from "../components/navbar/Stage";

const OrderPage = () => {
    const navigate = useNavigate();
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
            })),
        },
    });

    const { fields } = useFieldArray({
        control: methods.control,
        name: "passengers",
    });

    const onSubmit = async (formData) => {
        try {
            const submissionPromises = formData.passengers.map((passenger) =>
                axiosInstance.post("/passengers", passenger)
            );

            await Promise.all(submissionPromises);

            toast.success("Successfully added all passengers");
            navigate("/");
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                "An error occurred while submitting passenger data";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Navbar />
            <Stage />
            <FormProvider {...methods}>
                <div className="max-w-7xl mx-auto p-4">
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        {/* Left Column - Forms */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-xl mb-4">
                                    Isi Data Pemesan
                                </h2>
                                <FormPemesan />
                            </div>

                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="font-bold text-xl mb-4">
                                    Isi Data Penumpang
                                </h2>
                                {fields.map((field, index) => (
                                    <FormPassenger
                                        key={field.id}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Flight Details & Payment */}
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
