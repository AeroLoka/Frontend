import React from "react";
import InputForm from "./InputForm";
import { useFormContext, useWatch } from "react-hook-form";
import ToggleSwitch from "../Button/SwitchButton";
import { useSelector } from "react-redux";

const FormPemesan = () => {
    const { control, setValue } = useFormContext();

    const {email, phoneNumber, name} = useSelector((state) => state.userState.user);

    const hasLastName = useWatch({
        control,
        name: `hasLastName`,
        defaultValue: false,
    });

    const handleToggle = (newValue) => {
        setValue(`hasLastName`, newValue);
        if (!newValue) {
            setValue(`booking_lastName`, "");
        }
    };

    return (
        <div className="">
            <h3 className="text-lg font-semibold mb-4 bg-black text-white px-4 py-2 rounded-t-xl">
                Data Diri Pemesan
            </h3>
            <InputForm
                name="booking_name"
                label="Full Name"
                placeholder="Enter your full name"
                validation={{
                    required: "First name is required",
                }}
                value={name}
            />
            <div className="flex justify-between mb-4">
                <span className="font-bold">Do you have family name?</span>
                <ToggleSwitch isOn={hasLastName} onToggle={handleToggle} />
            </div>

            {hasLastName && (
                <InputForm
                    name={`booking_lastName`}
                    label="Family Name"
                    placeholder="Enter your family name"
                    validation={{
                        required: hasLastName ? "Last name is required" : false,
                    }}
                />
            )}
            <InputForm
                name="phone_number"
                label="Phone Number"
                placeholder="Ex: 081234567890"
                validation={{
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "Invalid phone number",
                    },
                }}
                value={phoneNumber}
            />

            <InputForm
                name="email"
                label="Email"
                type="email"
                placeholder="Ex: email@example.com"
                validation={{
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                    },
                }}
                value={email}
            />
        </div>
    );
};

export default FormPemesan;
