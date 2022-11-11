import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface IFormData {
  user: string;
  pass: string;
}

const schema = yup
  .object({
    user: yup
      .string()
      .required("Este campo es obligatorio")
      .email("Debe ser un mail valido"),
    pass: yup.string().required("Este campo es obligatorio"),
  })
  .required();

const LoginForm = () => {
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((values) => {
    let back_url = process.env.REACT_APP_BACKEND_URL;
    if (back_url)
      axios(`${back_url}/users/`, {
        
      })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.error(e));
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="Mail: example@gmail.com"
          {...register("user")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.user && (
          <p className="text-red-600 font-bold">{errors.user.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <input
          type={"password"}
          placeholder="Contraseña"
          {...register("pass")}
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.pass && (
          <p className="text-red-600 font-bold">{errors.pass.message}</p>
        )}
      </div>

      <div className="self-start">
        <input
          type={"checkbox"}
          name="remember"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />{" "}
        Recordar mi sesión
      </div>
      <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">
        Ingresar
      </button>
      <Link
        to="/register"
        className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5 mb-8"
      >
        Registrate
      </Link>
    </form>
  );
};

export default LoginForm;

// -------------------- Input del Form --------------------

// interface inputProps {
//   name: string;
//   type: string;
//   placeholder: string;
// }

// const FormInput = ({ name, type, placeholder }: inputProps) => {
//   return (
//     <div className="mb-3.5 w-full">
//       <input
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
//       />
//       <ErrorText errorText="error" />
//     </div>
//   );
// };

// // -------------------- Text Error del form --------------------
// interface errorProps {
//   errorText: string;
// }

// const ErrorText: React.FC<errorProps> = ({ errorText }: errorProps) => {
//   return <p className="text-red-600 font-bold text-end">*{errorText}</p>;
// };
