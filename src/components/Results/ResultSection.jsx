import React from "react";

const ResultsSection = ({ loading }) => (
  <section className="md:w-3/4 md:ml-8 mt-8 md:mt-0 flex flex-col items-center">
    {loading ? (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-gray-600 text-lg font-medium mb-5">
          Mencari penerbangan terbaik...
        </p>
        <div className="animate-pulse w-40 h-20 rounded-md flex items-center justify-center">
          <img
            src="public/images/Loading.png"
            alt="Loading Icon"
            className="w-40 h-20"
          />
        </div>
      </div>
    ) : (
      <p className="text-gray-600 text-lg font-medium">
        <div className="rounded-md flex items-center justify-center">
          <img
            src="public/images/ilustrasi.png"
            alt="Ilustrasi"
            className="w-72 h-62"
          />
        </div>
      </p>
    )}
  </section>
);

export default ResultsSection;
