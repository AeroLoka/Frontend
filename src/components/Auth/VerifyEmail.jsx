import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";

const VerifyEmail = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <div className="">
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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
                    />
                    <button type="submit" className="w-full bg-[#7126B5] text-white py-3 px-4 rounded-lg hover:bg-[#531d85] transition-colors">
                        Kirim
                    </button>
                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default VerifyEmail;
