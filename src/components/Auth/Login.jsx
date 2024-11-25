const Login = () => {
  return (
    <div>
      <h1>Daftar</h1>
      <form action="">
        <label htmlFor="" className="flex flex-col w-full">
          Nama
        </label>
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="flex items-center mb-[16px] w-[453px] h-[48px] rounded-[16px] border-solid border-2 border-[#D0D0D0]"
        />
        <label for="email" className="text-[12px]">
          Email
        </label>
        <input
          type="email"
          placeholder="Contoh: johndee@gmail.com"
          className="flex items-center mb-[16px] w-[453px] h-[48px] rounded-[16px] border-solid border-2 border-[#D0D0D0]"
        />

        <label for="phone" className="text-[12px]">
          Nomor Telepon
        </label>
        <input
          type="text"
          placeholder="+62"
          className="flex items-center mb-[16px] w-[453px] h-[48px] rounded-[16px] border-solid border-2 border-[#D0D0D0]"
        />

        <label for="password" className="text-[12px]">
          Buat Password
        </label>
        <input
          type="password"
          placeholder="Buat Password"
          className="flex items-center mb-[24px] w-[453px] h-[48px] rounded-[16px] border-solid border-2 border-[#D0D0D0]"
        />

        <button
          type="submit"
          className="w-[453px] h-[48px] bg-[#7126B5] text-white rounded-[16px] mb-[48px]"
        >
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Login;
