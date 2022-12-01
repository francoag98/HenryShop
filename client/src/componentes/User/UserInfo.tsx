import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { useAppSelector } from "../../hooks";
import UserInfoShow, { IUserShowProps } from "./UserInfoShow";

const UserInfo = () => {
  // const { username } = useAppSelector((state) => state.user);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const [info, setInfo] = useState<IUserShowProps>({
    name: "",
    username: "",
    email: "",
    birthday: "",
    confirmed: false,
  });

  useEffect(() => {
    const rawSession = window.localStorage.getItem('userSession');
    const session = JSON.parse(window.localStorage.getItem('userSession') as string);
    if(session.origin === 'default'){
      axiosGetCall(`/users/getuser/${session.username}`)
        .then(({ data }) => {
          const { name, username, email, birthday, confirmed } = data;
          setInfo({ name, username, email, birthday, confirmed });
          setDisplay(true);
        })
        .catch((e) => {
          navigate("/unauthorized");
        });
    }else if(session.origin === 'google'){
      axiosGetCall(`/googleusers/${session.email}`)
        .then(({ data }) => {
          const { name, email, birthday, confirmed } = data;
          setInfo({ name: name, email: email, birthday: birthday, confirmed:confirmed, username: '' });
          setDisplay(true);
        })
        .catch((e) => {
          navigate("/unauthorized");
        });
    }else if(session.origin === 'github'){
      axiosGetCall(`/githubusers/${session.username}`)
        .then(({ data }) => {
          const { username, confirmed } = data;
          setInfo({ name: "", email: '', birthday: '', confirmed:confirmed, username: username });
          setDisplay(true);
        })
        .catch((e) => {
          navigate("/unauthorized");
        });
    }
      
  }, [navigate]);

  return <>{display ? <UserInfoShow user={info} /> : null}</>;

    
};

export default UserInfo;
