import React from "react";
import { useLocation, Link } from "react-router-dom";

const steps = [
  { label: "Isi Data Diri", path: "/isi-data-diri" },
  { label: "Bayar", path: "/bayar" },
  { label: "Selesai", path: "/payment-status" },
];

const Stepper = () => {
  const location = useLocation();

  // Determine the current step based on the path
  const currentStep = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Label */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
              index <= currentStep
                ? "bg-[#7126B5]" // Highlight completed/current steps
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>

          <div
            className={`ml-2 text-sm font-medium ${
              index <= currentStep ? "text-[#7126B5]" : "text-gray-500"
            }`}
          >
            <Link to={step.path}>{step.label}</Link>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-[2px] mx-4 ${
                index < currentStep ? "bg-[#7126B5]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
