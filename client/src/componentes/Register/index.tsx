import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import RegisterForm from "./RegisterForm";
import jwt_decode from "jwt-decode";
import googleLogo from "../../assets/2875404.png"
import githubLogo from "../../assets/25231.png"
import {useNavigate} from "react-router-dom";
import henryShop from "../../assets/henryShop.png"

const Register = () => {

  const navigate = useNavigate();
  const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string);

  const googleAuth = async () => {
    const popup = window.open(
      `${REACT_APP_BACKEND_URL}/googleusers/google/callback`,
      'targetWindow',
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbar=yes,
      resizable=yes,
      width=620,
      height=700`
    );
    await window.addEventListener('message',(event)=>{
      if(event.origin === REACT_APP_BACKEND_URL){
        if(event.data){
          localStorage.setItem('userSession', JSON.stringify(event.data.user));
          popup?.close();
          navigate('/');
        }
      }
    });
  };

  const gitAuth = async() => {
    const popup = window.open(
      `${REACT_APP_BACKEND_URL}/githubusers/github`,
      'targetWindow',
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbar=yes,
      resizable=yes,
      width=620,
      height=700`
    );

    await window.addEventListener('message',(event)=>{
      if(event.origin === REACT_APP_BACKEND_URL){
        if(event.data){
          localStorage.setItem('userSession', JSON.stringify(event.data.user));
          popup?.close();
          navigate('/');
        }
      }
    });
  };

  return (
    <div className="flex items-center 2xl:justify-between xl:justify-between xl:w-screen xl:bg-yellow xl:h-screen mr-8 xl:mr-0 2xl:mr-0 2xl:w-screen">
      <div className="xl:w-screen xl:mb-72 ml-9 2xl:w-screen">
        <img className="xl:p-6 h-0 w-0 sm:h-0 sm:w-0 xl:w-auto xl:h-80 xl:mt-80 " src={henryShop} alt="Logo_henry" />
      </div>
      <div className="flex flex-col items-center xl:w-screen xl:h-screen bg-[#FFFDE7] 2xl:w-screen">
        <h4 className="mt-8 sm:mt-42 lg:mt-36 xl:mt-16 max-[800px]:mt-20 2xl:mt-32">Bienvenido a</h4>
        <img src={henryImg} alt="Logo de Henry" className="w-3/4 xl:p-2" />
        <h3 className="p-2">Registrate</h3>
          <RegisterForm />
        <div className="mb-10 xl:mb-60 xl:flex xl:flex-col">
          <button className="p-2 flex flex-row bg-white border-black border mb-4 rounded-sm shadow-md" onClick={googleAuth}>
           <img className= "w-6 h-6 mr-2"src={googleLogo} alt="" /> <p>Inicia sesion con Google</p>
          </button>
          <button className="p-2 w-full flex flex-row bg-white border-black border rounded-sm shadow-md" onClick={gitAuth}>
            <img className="w-6 h-6 mr-2" src={githubLogo} alt="" /> <p className="w-auto">Inicia sesion GitHub</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
