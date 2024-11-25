import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import InputForm from "../components/form/InputForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const OrderPage = () => {
    const navigate = useNavigate();
    const [passengerCount, setPassengerCount] = useState(1);

    const methods = useForm({
        defaultValues: {
            passengers: [
                {
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    nationality: "",
                    ktp_number: "",
                    passport: "",
                    negara_penerbit: "",
                    berlaku_sampai: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "passengers",
    });

    // Handle passenger count change
    const handlePassengerCountChange = (count) => {
        const newCount = parseInt(count);
        setPassengerCount(newCount);

        const currentLength = fields.length;
        if (newCount > currentLength) {
            for (let i = currentLength; i < newCount; i++) {
                append({
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    nationality: "",
                    ktp_number: "",
                    passport: "",
                    negara_penerbit: "",
                    berlaku_sampai: "",
                });
            }
        } else if (newCount < currentLength) {
            for (let i = currentLength - 1; i >= newCount; i--) {
                remove(i);
            }
        }
    };

    const onSubmit = async (formData) => {
        try {
            // Create an array of promises for each passenger submission
            const submissionPromises = formData.passengers.map((passenger) =>
                axiosInstance.post("/passengers", passenger)
            );

            // Wait for all submissions to complete
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
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Number of Passengers
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={passengerCount}
                        onChange={(e) =>
                            handlePassengerCountChange(e.target.value)
                        }
                        className="p-2 border rounded-md"
                    />
                </div>

                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="border rounded-lg p-6 space-y-4 bg-gray-50"
                        >
                            <h3 className="text-lg font-semibold mb-4">
                                Passenger {index + 1}
                            </h3>

                            <InputForm
                                name={`passengers.${index}.first_name`}
                                label="First Name"
                                placeholder="Enter your first name"
                                validation={{
                                    required: "First name is required",
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "First name cannot exceed 20 characters",
                                    },
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.last_name`}
                                label="Last Name"
                                placeholder="Enter your last name"
                                validation={{
                                    required: "Last name is required",
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "Last name cannot exceed 20 characters",
                                    },
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.birth_date`}
                                label="Birth Date"
                                type="date"
                                validation={{
                                    required: "Birth date is required",
                                    max: {
                                        value: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        message: "Invalid birth date",
                                    },
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.nationality`}
                                label="Nationality"
                                placeholder="Enter your Nationality"
                                validation={{
                                    required: "Nationality is required",
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.ktp_number`}
                                label="KTP Number"
                                placeholder="Enter your KTP Number"
                                validation={{
                                    required: "KTP Number is required",
                                    maxLength: {
                                        value: 16,
                                        message:
                                            "KTP Number cannot exceed 16 characters",
                                    },
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.passport`}
                                label="Passport"
                                placeholder="Enter your Passport"
                                validation={{
                                    required: "Passport is required",
                                    maxLength: {
                                        value: 10,
                                        message:
                                            "Passport cannot exceed 10 characters",
                                    },
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.negara_penerbit`}
                                label="Negara Penerbit"
                                placeholder="Enter your Negara Penerbit"
                                validation={{
                                    required: "Negara Penerbit is required",
                                }}
                            />

                            <InputForm
                                name={`passengers.${index}.berlaku_sampai`}
                                label="Berlaku Sampai"
                                type="date"
                                validation={{
                                    required: "Berlaku Sampai is required",
                                    min: {
                                        value: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        message: "Invalid Berlaku Sampai",
                                    },
                                }}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Submit All Passenger Data
                    </button>
                </form>
            </div>
        </FormProvider>
    );
};

export default OrderPage;