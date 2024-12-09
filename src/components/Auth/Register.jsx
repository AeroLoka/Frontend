import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputForm from "../form/InputForm";
import { toast } from "react-toastify";
import { register } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { setOtpData } from "../../features/otpSlice";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        try {
            const registerData = {
                name: data.nama,
                email: data.email,
                phoneNumber: data.phone,
                password: data.password,
            };
            const response = await register(registerData);
            toast.success(response.message);
            dispatch(setOtpData({
                email: response.data.email,
                otpToken: response.data.otpToken,
            }))
            navigate("/activation/otp");
        } catch (error) {
            toast.error(error.message || "Registrasi gagal");
        }
    };

    return (
        <div>
            <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        name="nama"
                        label="Nama"
                        placeholder="Nama Lengkap"
                        validation={{
                            required: "Nama wajib diisi",
                        }}
                        className="placeholder:text-xs placeholder:lg:text-md"
                    />
                    <InputForm
                        name="email"
                        label="Email"
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
