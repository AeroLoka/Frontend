import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import FormPassenger from "../components/form/FormPassenger";

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
        <FormProvider {...methods}>
            <div className="max-w-2xl mx-auto p-4">
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-8"
                >

                    <div className="border p-4">
                    <p className="font-bold text-xl">Isi Data Pemesanan</p>
                    </div>
                    <div className="border p-4">
                    <p className="font-bold text-xl mb-4">Isi Data Penumpang</p>
                    {fields.map((field, index) => (
                        <FormPassenger key={field.id} index={index} />
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Lanjut Bayar
                    </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default OrderPage;
