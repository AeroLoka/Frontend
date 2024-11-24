import destination1 from "../../assets/images/destination.png";

const HomeCard = () => {
  return (
    <>
      <div className="grid grid-cols-5 px-[200px]">
        <div className="flex flex-col items-center justify-center w-[166.939px] h-[194px] bg-white rounded shadow-lg px-3 py-3">
          <div className="mb-3">
            <img src={destination1} alt="" />
          </div>
          <div>
            <p className="text-xs font-medium">Jakarta - Bangkok</p>
            <p className="text-[10px] text-[#7126B5] font-bold">AirAsia</p>
            <p className="text-[10px] font-medium">20 - 30 Maret 2024</p>
            <p className="text-xs font-medium">
              Mulai dari
              <span className="text-red-500 font-bold"> IDR 950.000</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
