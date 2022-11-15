import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";


const Login = () => {



  return (
    <div className="flex flex-col items-center bg-[#FFFDE7]">
      <h4 className="mt-4">Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <h3>Inicia Sesión</h3>
      <LoginForm />
      <div>
        <GoogleLogin
          onSuccess={credentialResponse => {
            //console.log(credentialResponse.credential);
            var decoded = jwt_decode(`${credentialResponse.credential}`);
            console.log(decoded);

          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

      </div>
    </div>
  );
};

export default Login;
