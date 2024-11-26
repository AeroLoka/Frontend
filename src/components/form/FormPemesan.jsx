import React from "react";
import InputForm from "./InputForm";

const FormPemesan = () => {
    return (
        <div className="">
            <h3 className="text-lg font-semibold mb-4 bg-black text-white px-4 py-2 rounded-t-xl">
                Data Diri Pemesan
            </h3>
            <InputForm
                name="name"
                label="Full Name"
                placeholder="Enter your first name"
                validation={{
                    required: "First name is required",
                }}
            />
            <InputForm
                name="last_name"
                label="Family Name"
                placeholder="Enter your last name"
                validation={{}}
            />
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
            />
        </div>
    );
};

export default FormPemesan;
