import { useForm } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

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
    // birthday: yup.date(),
  })
  .required();

const RegisterForm = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleChange = (newValue: Dayjs | null) => {

    console.log(value?.format("YYYY-MM-DD"));

    setValue(newValue);
  };

  const handlerSubmit = handleSubmit(({ username, name, email, password }) => {
    const back_url = process.env.REACT_APP_BACKEND_URL;
    const birthday = value?.format("YYYY-MM-DD");
    console.log({
      username,
      name,
      email,
      password,
      birthday,
    });
    
    axios
      .post(`${back_url}/users`, {
        username,
        name,
        email,
        password,
        birthday,
      })
      .then((r) => console.log(r))
      .catch((e) => console.error(e.message));
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="Nombre"
          {...register("name")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.name && (
          <p className="text-red-600 font-bold">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="Nombre de Usuario"
          {...register("username")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.username && (
          <p className="text-red-600 font-bold">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="eMail: example@gemail.com"
          {...register("email")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.email && (
          <p className="text-red-600 font-bold">{errors.email.message}</p>
        )}
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
      <div className="mb-3.5 w-full">
        <input
          type={"password"}
          placeholder="Contraseña"
          {...register("password")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.password && (
          <p className="text-red-600 font-bold">{errors.password.message}</p>
        )}
      </div>

      <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">
        Resgistrarse
      </button>
      <Link
        to="/login"
        className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5 mb-8"
      >
        Iniciar Sesión
      </Link>
    </form>
  );
};

export default RegisterForm;
