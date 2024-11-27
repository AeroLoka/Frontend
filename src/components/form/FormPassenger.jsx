import React, { useState } from "react";
import countries from "../../assets/data/countries";
import SelectForm from "./SelectForm";
import InputForm from "../form/InputForm";
import { useFormContext, useWatch } from "react-hook-form";

const FormPassenger = ({ index }) => {
    const { control } = useFormContext();
    
    // Gunakan useWatch untuk memantau perubahan nilai identification_type
    const identificationType = useWatch({
        control,
        name: `passengers.${index}.identification_type`
    });

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4 bg-black text-white px-4 py-2 rounded-t-xl">
                Data Diri Penumpang {index + 1} - Adult
            </h3>

            <InputForm
                name={`passengers.${index}.first_name`}
                label="First Name"
                placeholder="Enter your first name"
                validation={{
                    required: "First name is required",
                }}
            />

            <InputForm
                name={`passengers.${index}.last_name`}
                label="Last Name"
                placeholder="Enter your last name"
                validation={{}}
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

            <SelectForm
                key={index}
                name={`passengers.${index}.nationality`}
                label="Nationality"
                placeholder="Select your Nationality"
                validation={{
                    required: "Nationality is required",
                }}
                list={countries}
            />

<SelectForm
                name={`passengers.${index}.identification_type`}
                label="Identification Type"
                placeholder="Select your identification type"
                validation={{
                    required: "Identification type is required",
                }}
                list={[
                    { label: "KTP", value: "ktp" },
                    { label: "Passport", value: "passport" },
                ]}
            />

            {identificationType === "ktp" && (
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
            )}

            {identificationType === "passport" && (
                <>
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
                    <SelectForm
                        name={`passengers.${index}.negara_penerbit`}
                        label="Negara Penerbit"
                        placeholder="Select your negara penerbit"
                        validation={{
                            required: "Negara penerbit is required",
                        }}
                        list={countries}
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
                </>
            )}
        </div>
    );
};

export default FormPassenger;
