import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="">
          <InputForm
            name="emailOrPhone"
            label="Email/No Telepon"
            placeholder="Contoh: johndoe@gmail.com"
            validation={{
              required: "Email atau nomot telepon wajib diisi",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Format email tidak valid",
              },
            }}
            className="placeholder:text-xs placeholder:md:text-md"
          />

          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <span className="text-[#7126B5] font-medium text-xs lg:text-sm">
              <a href="#" onClick={() => navigate("/forget-password")}>
                Lupa Kata Sandi
              </a>
            </span>
          </div>

          <InputForm
            name="password"
            placeholder="Masukkan password"
            validation={{
              required: "Password wajib diisi",
              pattern: {
                value: /^.{6,}$/,
                message: "Password minimal 6 karakter",
              },
            }}
            className="placeholder:text-xs placeholder:lg:text-md"
          />

          <button
            type="submit"
            className="w-full bg-[#7126B5] text-white py-3 px-4 rounded-lg hover:bg-[#531d85] transition-colors"
          >
            Masuk
          </button>
        </form>
      </FormProvider>

      <div className="text-center text-sm mt-10">
        <p className="">
          Belum punya akun?
          <a href="">
            <span
              onClick={() => navigate("/register")}
              className="text-[#7126B5] font-bold"
            >
              {" "}
              Daftar di sini
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
