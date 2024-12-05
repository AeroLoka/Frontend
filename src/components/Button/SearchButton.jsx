import searchIconWhite from "../../assets/icons/fi_search-white.svg";
import searchIconBlack from "../../assets/icons/fi_search-black.svg";

const SearchDestination = () => {
  return (
    <div className="px-40 flex gap-x-4 mb-5">
      <div className="w-[126px] h-[48px] bg-[#7126B5] rounded-xl flex items-center justify-center hover:bg-purple-900">
        <a
          href="#"
          className="flex items-center gap-2 text-white text-sm font-medium"
        >
          <img src={searchIconWhite} alt="" className="w-5 h-5" />
          Semua
        </a>
      </div>

      <div className="w-[126px] h-[48px] bg-[#E2D4F0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#C594F6]">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <img src={searchIconBlack} alt="" className="w-5 h-5" />
          Asia
        </a>
      </div>

      <div className="w-[126px] h-[48px] bg-[#E2D4F0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#C594F6]">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <img src={searchIconBlack} alt="" className="w-5 h-5" />
          Amerika
        </a>
      </div>

      <div className="w-[126px] h-[48px] bg-[#E2D4F0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#C594F6]">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <img src={searchIconBlack} alt="" className="w-5 h-5" />
          Australia
        </a>
      </div>

      <div className="w-[126px] h-[48px] bg-[#E2D4F0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#C594F6]">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <img src={searchIconBlack} alt="" className="w-5 h-5" />
          Eropa
        </a>
      </div>

      <div className="w-[126px] h-[48px] bg-[#E2D4F0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#C594F6]">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <img src={searchIconBlack} alt="" className="w-5 h-5" />
          Afrika
        </a>
      </div>
    </div>
  );
};

export default SearchDestination;
