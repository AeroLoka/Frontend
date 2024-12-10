import searchIconWhite from "../../assets/icons/fi_search-white.svg";
import searchIconBlack from "../../assets/icons/fi_search-black.svg";
import { useState } from "react";

const SearchDestination = () => {
  const [activeButton, setActiveButton] = useState("semua");

  const handleButtonClick = (destination) => {
    setActiveButton(destination);
  };

  const getButtonClasses = (destination) => {
    const isActive = activeButton === destination;
    return isActive
      ? "bg-[#7126B5] text-white hover:bg-purple-900"
      : "bg-[#E2D4F0] text-black hover:bg-[#C594F6] hover:shadow-xl";
  };

  const getIcon = (destination) => {
    return activeButton === destination ? searchIconWhite : searchIconBlack;
  };

  return (
    <div className="px-8 flex gap-x-4 lg:px-40">
      <div className="flex gap-x-4 overflow-x-auto py-2">
        <div
          className={`min-w-[126px] h-[48px] rounded-xl flex items-center justify-center ${getButtonClasses(
            "semua"
          )}`}
        >
          <a
            href="#"
            onClick={() => handleButtonClick("semua")}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <img src={getIcon("semua")} alt="" className="w-5 h-5" />
            Semua
          </a>
        </div>

        {["asia", "amerika", "australia", "eropa", "afrika"].map(
          (destination) => (
            <div
              key={destination}
              className={`min-w-[126px] h-[48px] px-4 rounded-xl flex items-center justify-center cursor-pointer ${getButtonClasses(
                destination
              )}`}
            >
              <a
                href="#"
                onClick={() => handleButtonClick(destination)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <img src={getIcon(destination)} alt="" className="w-5 h-5" />
                {destination.charAt(0).toUpperCase() + destination.slice(1)}
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchDestination;
