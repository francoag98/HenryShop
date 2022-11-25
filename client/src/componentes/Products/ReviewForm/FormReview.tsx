import React, { useState } from "react";
import { Rating, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppSelector } from "../../../hooks";

interface IFormData {
  text: string;
}

const schema = yup
  .object({
    text: yup.string().required("El texto es un campo obligatorio"),
  })
  .required();

const FormReview = () => {
  const navigate = useNavigate();
  const { id: productId } = useAppSelector(
    (state) => state.products.productDetail
  );
  const [result, setResult] = useState("");
  const [ratingValue, setRatingValue] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((value) => {
    setResult("");
    axiosPostCall("/reviews", {
      productId: productId,
      text: value.text,
      rating: ratingValue,
    })
      .then(({ data }) => {
        console.log(data);
        alert("Reseña enviada");
      })
      .catch((e) => setResult(e.response.data.message));
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center items-center flex-col w-10/12 m-auto mt-4 border-2 border-black border-solid rounded-2xl py-4"
    >
      <h4 className="mb-4">Deja tu reseña</h4>
      <Typography component="legend">Rating</Typography>
      <Rating
        className="mb-4"
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          if (newValue) setRatingValue(newValue);
        }}
      />
      <textarea
        className="border border-black border-solid rounded-2xl w-11/12 h-24 p-2"
        {...register("text")}
      ></textarea>
      {errors.text && <p>{errors.text.message}</p>}
      {result && <p>{result}</p>}
      <button className="bg-yellow duration-300 hover:bg-gray-200 hover:duration-300 p-2 mt-4 font-bold rounded-3xl pl-4 pr-4 border-b-2 border-black">
        Enviar Reseña
      </button>
    </form>
  );
};

export default FormReview;
