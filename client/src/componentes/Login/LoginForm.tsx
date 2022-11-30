import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import FormSubmittingLoader from "../FormSubmittingLoader";

const errorStyle =
  "mt-1 text-red-600 font-bold bg-red-100 p-1 border-2 border-red-700 border-solid rounded-2xl";
const inputStyle =
  "border border-black border-solid w-64 min-[800px]:w-96 min-[700px]:w-96 rounded-sm pl-2 py-1";

interface IFormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().default("a").required("Este campo es obligatorio"),
    // .email("Debe ser un mail valido"),
    password: yup.string().required("Este campo es obligatorio"),
  })
  .required();

const LoginForm = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((value) => {
    setResult("");
    let back_url = process.env.REACT_APP_BACKEND_URL;
    if (back_url) {
      setSubmitting(true);
      axios
        .post<IFormData>(`${back_url}/users/login`, value)
        .then(({ data }) => {
          localStorage.setItem("userSession", JSON.stringify(data));
          navigate("/");
        })
        .catch((e) => {
          if(e.response.data.error_message === "Cuenta deshabilitada"){
            alert("No has podido iniciar sesion. Tu cuenta ha sido deshabilitada. Contáctate con el suporte.");
            navigate("/");
          }else{
            setResult(e.response.data.message)
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 mt-6 mb-6"
    >
      <div className="mb-3.5">
        <input
          type={"text"}
          placeholder="Nombre de Usuario"
          {...register("username")}
          className={inputStyle}
        />
        {errors?.username && (
          <p className={errorStyle}>{errors.username.message}</p>
        )}
      </div>

      <div className="mb-3.5">
        <input
          type={"password"}
          placeholder="Contraseña"
          {...register("password")}
          className={inputStyle}
        />
        {errors?.password && (
          <p className={errorStyle}>{errors.password.message}</p>
        )}
      </div>

      <div className="flex max-[800px]:self-start max-[800px]:ml-20 max-[1024px]:self-start 2xl:mr-64 2xl:ml-12 xl:ml-10 mb-4">
        <input
          className="xl:w-4 xl:h-4 xl:mt-1"
          type={"checkbox"}
          name="remember"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />{" "}
        <p className="xl:mb-1 ml-1">Recordar mi sesión</p>
      </div>
      {result.length ? <p className={errorStyle}>{result}</p> : null}
      {submitting ? (
        <FormSubmittingLoader />
      ) : (
        <>
          <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 xl:gap-3">
            <button className="bg-yellow w-auto px-6 py-2  rounded-sm font-bold my-1.5 hover:bg-black hover:text-yellow hover:duration-500 duration-300 shadow-lg">
              Ingresar
            </button>
            <Link
              to="/register"
              className="bg-yellow w-auto py-2 px-4 rounded-sm font-bold my-1.5 hover:bg-black hover:text-yellow hover:duration-500 duration-300 shadow-lg"
            >
              Registrate
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;