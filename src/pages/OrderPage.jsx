import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../components/form/InputForm";

const OrderPage = () => {
    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-4 max-w-md mx-auto p-4"
            >
                <InputForm
                    name="firstName"
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
                    name="lastName"
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default OrderPage;
