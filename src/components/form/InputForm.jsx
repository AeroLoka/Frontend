import React from "react";
import { useFormContext } from "react-hook-form";

const InputForm = ({ type = "text", name, label, validation, placeholder, className }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} className="text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`p-2 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...register(name, validation)}
                aria-invalid={errors[name] ? "true" : "false"}
            />
            {errors[name] && (
                <p className="text-sm text-red-500" role="alert">
                    {errors[name]?.message || `${label || name} is required`}
                </p>
            )}
        </div>
    );
};

export default InputForm;