import React, { useState } from "react";

const ButtonSelect = ({ onSelect }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onSelect) onSelect();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      className={`w-[100px] h-[32px] rounded-[12px] px-[12px] py-[4px] text-sm font-semibold 
        ${isClicked ? "bg-[#4B1979]" : "bg-[#7126B5]"} 
        text-white hover:bg-[#4B1979] transition-colors shadow-md`}
      onClick={handleClick}
    >
      Pilih
    </button>
  );
};

export default ButtonSelect;