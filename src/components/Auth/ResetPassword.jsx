import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputForm from "../form/InputForm";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        try {
            const resetData = {
                password: data.password,
                confirm_password: data.confirm_password,
            };
            const response = await resetPassword( token, resetData);
            toast.success(response.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Reset password failed");
        }
    };
    return (
        <div className="">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputForm
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        validation={{
                            required: "Password is required",
                        }}
                        className="placeholder:text-xs placeholder:lg:text-md"
                    />
                    <InputForm
                        name="confirm_password"
                        label="Confirm Password"
                        placeholder="Enter your password"
                        type="password"
                        validation={{
                            required: "Password is required",
                        }}
                        className="placeholder:text-xs placeholder:lg:text-md"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#7126B5] text-white py-3 px-4 rounded-lg hover:bg-[#531d85] transition-colors"
                    >
                        Kirim
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};

export default ResetPassword;
