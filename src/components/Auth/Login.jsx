import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Masuk</h1>
        </div>
        <div>
          <FormProvider {...methods}>
            <div>
              <form
                action=""
                onSubmit={methods.handleSubmit(onSubmit)}
                className=""
              >
                <InputForm
                  name="emailOrPhone"
                  type="text"
                  label="Email/No Telepon"
                  placeholder="Contoh: johndoe@gmail.com"
                  validation={{
                    required: "Email atau nomot telepon wajib diisi",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Format email tidak valid",
                    },
                  }}
                />

                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <span className="text-[#7126B5] font-medium text-sm">
                    <a href="#">Lupa Kata Sandi</a>
                  </span>
                </div>

                <InputForm
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  validation={{
                    required: "Password wajib diisi",
                    pattern: {
                      value: 0,
                      message: "Password minimal 6 karakter",
                    },
                  }}
                />

                <button
                  type="submit"
                  className="w-[453px] h-[48px] pl-3 bg-[#7126B5] text-white rounded-[16px] mb-[48px]"
                >
                  Masuk
                </button>
              </form>
            </div>
          </FormProvider>

          <div className="text-center">
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
      </div>
    </div>
  );
};

export default Login;
