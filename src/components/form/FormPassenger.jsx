import React from "react";
import InputForm from "../form/InputForm";

const FormPassenger = ({ index }) => {
    return (
        <div className="">
            <h3 className="text-lg font-semibold mb-4 bg-black text-white px-4 py-2 rounded-t-xl">
                Data Diri Penumpang {index + 1} - Adult
            </h3>

            <InputForm
                name={`passengers.${index}.first_name`}
                label="First Name"
                placeholder="Enter your first name"
                validation={{
                    required: "First name is required",
                    maxLength: {
                        value: 20,
                        message: "First name cannot exceed 20 characters",
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
                        message: "Last name cannot exceed 20 characters",
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
                        value: new Date().toISOString().split("T")[0],
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
                        message: "KTP Number cannot exceed 16 characters",
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
                        message: "Passport cannot exceed 10 characters",
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
                        value: new Date().toISOString().split("T")[0],
                        message: "Invalid Berlaku Sampai",
                    },
                }}
            />
        </div>
    );
};

export default FormPassenger;
