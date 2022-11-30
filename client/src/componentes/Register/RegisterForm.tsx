import { useForm } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import FormSubmittingLoader from "../FormSubmittingLoader";

const errorStyle =
  "mt-1 text-red-600 font-bold bg-red-100 p-1 border-2 border-red-700 border-solid rounded-sm";
const inputStyle =
  "border border-black border-solid w-64 min-[800px]:w-96 min-[700px]:w-96 rounded-sm pl-2 py-1";
interface IFormData {
  username: string;
  name: string;
  email: string;
  birthday: Dayjs | null;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required("Este campo es necesario"),
    username: yup.string().required("Este campo es necesario"),
    password: yup.string().required("Este campo es necesario"),
    email: yup.string().required("Este campo es necesario"),
  })
  .required();

const RegisterForm = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handlerSubmit = handleSubmit(({ username, name, email, password }) => {
    setResult("");
    setSubmitting(true);
    const back_url = process.env.REACT_APP_BACKEND_URL;
    const birthday = value?.format("YYYY-MM-DD");
    axios
      .post(`${back_url}/users`, {
        username,
        name,
        email,
        password,
        birthday,
      })
      .then(({ data }) => {
        localStorage.setItem("userSession", JSON.stringify(data));
        navigate("/");
      })
      .catch((e) => {
        setResult(e.response.data.error_message);
        console.log(e);
      })
      .finally(() => {
        setSubmitting(false);
      });
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >
      <div className="mb-3.5 xl:w-96">
        <input
          type={"text"}
          placeholder="Nombre"
          {...register("name")}
          className={inputStyle}
        />
        {errors?.name && <p className={errorStyle}>{errors.name.message}</p>}
      </div>
      <div className="mb-3.5 xl:w-96">
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
      <div className="mb-3.5 xl:w-96">
        <input
          type={"text"}
          placeholder="Email: example@gmail.com"
          {...register("email")}
          className={inputStyle}
        />
        {errors?.email && <p className={errorStyle}>{errors.email.message}</p>}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Fecha de Nacimiento"
          inputFormat="YYYY/MM/DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          className="mb-4"
        />
      </LocalizationProvider>
      <div className="mb-3.5 mt-4 xl:w-96">
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
      {result.length ? <p className={errorStyle}>{result}</p> : null}
      <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 xl:gap-3 mb-2">
        {submitting ? (
          <FormSubmittingLoader />
        ) : (
          <>
            <button className="bg-yellow w-auto py-2 px-4 rounded-sm font-bold my-1.5 hover:bg-black hover:text-yellow hover:duration-500 duration-300 shadow-lg">
              Registrate
            </button>
          </>
        )}
      </div>
      <p className="mb-2">
        Ya tienes cuenta?{" "}
        <NavLink to="/Login" className="text-blue-600 underline">
          Inicia Sesion
        </NavLink>
      </p>
    </form>
  );
};

export default RegisterForm;
