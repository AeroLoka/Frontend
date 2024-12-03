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
    <div className="flex flex-col items-center justify-center">
      <div>
        <div>
          <h1 className="text-xl font-bold mb-4">Daftar</h1>
        </div>
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
              />

              <button
                type="submit"
                className="w-[453px] h-[48px] pl-3 bg-[#7126B5] text-white rounded-[16px] mb-[48px]"
              >
                Daftar
              </button>
            </form>
          </FormProvider>
        </div>
        <div className="text-center">
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
    </div>
  );
};

export default Register;
