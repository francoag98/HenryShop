import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { Loading } from "../Loading";
import UserLoader from "./UserLoader";

interface IProtectedProps {
  children: JSX.Element;
}

const UserProtected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = window.localStorage.getItem("userSession");
    setDisplay(false);
    if (session) {
      axiosGetCall("/users/isUser")
        .then(() => {
          setDisplay(true);
        })
        .catch(() => {
          navigate("/unauthorized");
        });
    } else {
      navigate("/unauthorized");
    }
  }, [setDisplay, navigate, children]);

  // Replace with loader
  return <>{display ? children : <Loading />}</>;
};

export default UserProtected;
