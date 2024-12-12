import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Pagination = ({ currPage, totalPages, onPageChange }) => {
  const prev = () => {
    if (currPage > 1) {
      onPageChange(currPage - 1);
    }
  };

  const next = () => {
    if (currPage < totalPages) {
      onPageChange(currPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={prev}
        disabled={currPage === 1}
        className={`mx-3 ${
          currPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <div className="">
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currPage === index + 1
                ? "bg-[#7126B5] text-white"
                : "bg-[#E2D4F0] text-[#7126B5] hover:bg-[#7126B5] hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        </div>
      ))}
      <button
        onClick={next}
        disabled={currPage === totalPages}
        className={`mx-3 ${
          currPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
