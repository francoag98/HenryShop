import React, { useEffect } from "react";
import axios from "axios";
import { ImHome3, ImCart } from "react-icons/im";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import { Link } from "react-router-dom";
import Header from "./Header";
const henryFull = require("../assets/henryShop.png");
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Success = () => {

  const { setEmptyCart, cartItems } = useShoppingCart();

  const token =
    JSON.parse(window.localStorage.getItem("userSession") as string) &&
    (JSON.parse(window.localStorage.getItem("userSession") as string)
      .token as string);
  const salesHandler = async () => {
    await axios
      .post(
        `${BACKEND_URL}/users/shopping`,
        { products: cartItems },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
  };

  useEffect(() => {
    salesHandler()
    setEmptyCart()
  },[])
  return (
    <div className="w-full flex flex-col items-center h-screen">
        <div className="mt-32 flex flex-col items-center gap-4">
        <img src={henryFull} className="w-64" alt="logoHenry" />
        <h5>Gracias por tu compra!</h5>
        <div className="flex">
          <Link to="/" className="px-3">
          <div className="w-fit h-10 bg-yellow flex flex-row gap-4 p-2 items-center rounded-md hover:bg-gray-100 hover:duration-300 duration-300 cursor-pointer border-b-2 border-solid border-black">
            <ImHome3 className="w-6 h-6" />
            <p>Volver al inicio</p>
          </div>
        </Link>
        <Link to="/shopping" className="px-3">
          <div className="w-fit h-10 bg-yellow flex flex-row gap-4 p-2 items-center rounded-md hover:bg-gray-100 hover:duration-300 duration-300 cursor-pointer border-b-2 border-solid border-black">
            <ImCart className="w-6 h-6" />
            <p>Ver mi compra</p>
          </div>
        </Link>
        </div>        
      </div>
    </div>
  );
};

export default Success;
