import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";

const Register = () => {
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
          <InputForm
            name="nama"
            label="Nama"
            type="text"
            placeholder="Nama Lengkap"
            validation={{
              required: "Nama wajib diisi",
            }}
            className="placeholder:text-xs placeholder:lg:text-md"
          />
          <InputForm
            name="email"
            label="Email"
            type="email"
            placeholder="Contoh: johndee@gmail.com"
            validation={{
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            }}
            className="placeholder:text-xs placeholder:lg:text-md"
          />
          <InputForm
            name="phone"
            label="Nomor Telepon"
            type="text"
            placeholder="+62"
            validation={{
              required: "Nomor telepon wajib diisi",
              pattern: {
                value: /^[0-9]+$/,
                message: "Nomor telepon hanya boleh angka",
              },
            }}
            className="placeholder:text-xs placeholder:lg:text-md"
          />
          <InputForm
            name="password"
            label="Buat Password"
            type="password"
            placeholder="Buat Password"
            validation={{
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            }}
            className="placeholder:text-xs placeholder:lg:text-md"
          />

          <button
            type="submit"
            className="w-full bg-[#7126B5] text-white py-3 px-4 rounded-lg hover:bg-[#531d85] transition-colors"
          >
            Daftar
          </button>
        </form>
      </FormProvider>

      <div className="text-center text-sm mt-10">
        <p className="">
          Belum punya akun?
          <a href="">
            <span
              onClick={() => navigate("/login")}
              className="text-[#7126B5] font-bold"
            >
              {" "}
              Masuk di sini
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
