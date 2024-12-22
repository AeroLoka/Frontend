import { useNavigate } from "react-router-dom";

function ButtonChange() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="w-full whitespace-nowrap text-sm font-medium transition-colors bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-600 hover:text-white h-9 rounded-xl py-6 md:px-20 flex items-center justify-center text-white"
    >
      <span className="text-sm font-bold">Ubah Pencarian</span>
    </button>
  );
}

export default ButtonChange;
