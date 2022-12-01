import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import UserLoader from "./UserLoader";

interface IProtectedProps {
  children: JSX.Element;
}

const Protected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const session = window.localStorage.getItem("userSession");
    setDisplay(false)
    if (session) {
      axiosGetCall('/users/isAdmin')
        .then(() => {
          setDisplay(true);
        })
        .catch(() => {
          navigate("/");
        });
    }else{
      navigate('/')
    }
  }, [setDisplay, navigate]);

  return <>{display ? children : <UserLoader />}</>;
};

export default Protected;
