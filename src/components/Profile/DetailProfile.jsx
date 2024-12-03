import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";

const DetailProfile = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <h2 className="text-xl font-bold mb-4 mt-4">Ubah Data Profil</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <div className="bg-purple-500 text-white p-2 rounded-t-2xl">
                            Data Diri
                        </div>
                        <div className="">
                            <div>
                                <InputForm
                                    name="name"
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    validation={{
                                        required: "First name is required",
                                    }}
                                    value="John Doe"
                                />
                            </div>
                            <div>
                                <InputForm
                                    name="phone"
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    validation={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Invalid phone number",
                                        },
                                    }}
                                    value="081234567890"
                                />
                            </div>
                            <div>
                                <InputForm
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    validation={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Invalid email address",
                                        },
                                    }}
                                    value="user@example.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white rounded-md py-2 px-8 hover:bg-purple-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default DetailProfile;
