import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { ImHome3 } from "react-icons/im";
const henryFull = require("../assets/henryShop.png");
export const Failure = () => {
    

    return (
        <div className="w-full flex flex-col items-center h-screen">
            <div className="mt-32 flex flex-col items-center gap-4">
            <img src={henryFull} className="w-64" alt="logoHenry" />
            <h2>Lo sentimos, no se pudo proceder con la compra.</h2>
             <h3>¡Intentelo de nuevo más tarde!</h3>
            <Link to="/">
          <div className="w-fit h-10 bg-yellow flex flex-row gap-4 p-2 items-center rounded-md hover:bg-gray-100 hover:duration-300 duration-300 cursor-pointer border-b-2 border-solid border-black" >
            <ImHome3 className="w-6 h-6" />
            <p>Volver al inicio</p>
          </div>
        </Link>
        </div>
        </div>
    )

}