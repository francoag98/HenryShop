import axios from "axios";
const back_url = process.env.REACT_APP_BACKEND_URL as string;

// endpoint example:  "/users" "/users/usernameblabla"
export default function axiosGetCall(endpoint: string) {
  let token = "";
  if (window.localStorage.getItem("userSession")) {
    token = JSON.parse(window.localStorage.getItem("userSession") as string)
      .token as string;
  }
  if (token.length) {
    return axios.get(`${back_url}${endpoint}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  } else {
    return Promise.reject(new Error("No hay token"));
  }
}
