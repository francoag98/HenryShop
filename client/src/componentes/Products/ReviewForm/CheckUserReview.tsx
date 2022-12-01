import React, { useEffect } from "react";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppSelector } from "../../../hooks";
import FormReview from "./FormReview";

interface ICheckUserRewviewProps {
  reviewed: boolean;
  buyed: boolean
}

const session = JSON.parse(
  window.localStorage.getItem("userSession") as string
);

const CheckUserReview = ({reviewed, buyed}: ICheckUserRewviewProps) => {
  const { username, confirmed } = useAppSelector((state) => state.user);

  // Si está logueado, no muestr nada
  if (!username || !buyed || reviewed || session?.origin === "github" || session?.origin === "google") return null;

  // Si no está confirmado, mostrar aviso de que debe confirmar su mail
  if (!confirmed) return <ConfirmWarning />;

  return <FormReview />
};

export default CheckUserReview;

const ConfirmWarning = () => {
  return (
    <div className="w-10/12 py-4 m-auto mt-4 rounded-2xl border-2 border-solid border-red-600 bg-red-300 text-red-600 font-bold">
      Debes confirmar tu mail para dejar una reseña
    </div>
  );
};
