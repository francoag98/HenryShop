import React from "react";
import { useNavigate } from "react-router-dom";

const Unaothorized = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-24 px-4 h-40 max-w-lg border-2 font-bold border-red-600 border-solid rounded-2xl bg-red-200 w-8/12 flex flex-col justify-around items-center">
      <p className="text-red-600">¡No tienes permiso para estar en esa página!</p>
      <button
        className="bg-white duration-300 hover:bg-gray-200 hover:duration-300 p-2 rounded-sm pl-4 pr-4 border-b-2 border-black"
        onClick={() => navigate("/")}
      >
        Volver al Home
      </button>
    </div>
  );
};

export default Unaothorized;
