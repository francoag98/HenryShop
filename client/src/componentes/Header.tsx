import React, { useEffect, useState } from "react";
import logo from "../assets/logoHenryBlack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFiltersAction } from "../redux/slices/FiltersSlice/filtersActions";
import getObjectSession from "../funciones/getObjectSession";
import { setData, clearData } from "../redux/slices/UserSlice";

const Header = () => {
  const [deploy, setDeploy] = useState(false);
  const [categoryDeploy, setCategoryDeploy] = useState(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterState.filters);
  const { username } = useAppSelector((state) => state.user);
  const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string)

  const logout = () => {
    localStorage.removeItem("userSession");
    dispatch(clearData());
    setDeploy(false);
    window.open(
      `${REACT_APP_BACKEND_URL}/googleusers/google/logout`,
      '_self'
    );
  };

  useEffect(() => {
    const session = getObjectSession();
    if (session) {
      dispatch(setData(session));
    }
  });

  return (
    <nav className="flex flex-col sticky w-full">
      <div className=" h-20 p-2 pl-2 pr-4 bg-yellow flex justify-between items-center">
        <Link to="/" className="h-full">
          <img src={logo} alt="Logo de Henry" className="h-full select-none" />
        </Link>

        <GiHamburgerMenu
          onClick={() => {
            setDeploy(!deploy);
          }}
          className={
            deploy
              ? "-rotate-90 h-10 w-auto cursor-pointer duration-300"
              : "h-10 w-auto cursor-pointer duration-300"
          }
        />
      </div>
      {deploy && (
        <div
          id="divDeployNavbar"
          className="bg-yellow h-auto pb-4 w-full origin-top animate-open-menu duration-300 flex flex-col"
        >
          <div className="select-none flex justify-evenly font-bold text-lg">
            {username ? (
              <>
                <h2>{username}</h2>
                <button
                  className="bg-white duration-300 hover:bg-gray-200 hover:duration-300 p-2 rounded-3xl pl-4 pr-4 border-b-2 border-black"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/Login">
                  <button className="bg-white duration-300 hover:bg-gray-200 hover:duration-300 p-2 rounded-3xl pl-4 pr-4 border-b-2 border-black">
                    Iniciar sesion
                  </button>
                </Link>
                <Link to="/Register">
                  <button className="bg-white duration-300 hover:bg-gray-200 hover:duration-300 p-2 rounded-3xl pl-4 pr-4 border-b-2 border-black">
                    Registrarse
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="p-4 flex flex-col text-left justify-start select-none">
            <h5 className="pl-2 hover:pl-4 hover:delay-300 duration-300 font-bold hover:cursor-pointer">
              Productos
            </h5>
            <h5
              onClick={() => setCategoryDeploy(!categoryDeploy)}
              className="font-bold mt-4  hover:delay-300 hover:cursor-pointer pl-2 hover:pl-4 duration-300"
            >
              Categorias
            </h5>
            {categoryDeploy && (
              <div className="animate-open-menu origin-top">
                <h6
                  className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setFiltersAction({ ...filters, category: "Gorra" })
                    );
                  }}
                >
                  Gorras
                </h6>
                <h6
                  onClick={() => {
                    dispatch(
                      setFiltersAction({ ...filters, category: "Mate" })
                    );
                  }}
                  className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer"
                >
                  Mates
                </h6>
                <h6
                  onClick={() => {
                    dispatch(
                      setFiltersAction({ ...filters, category: "Remera" })
                    );
                  }}
                  className="pl-4 hover:pl-6 duration-300 hover:duration-300 hover:cursor-pointer"
                >
                  Remeras
                </h6>
              </div>
            )}
            <h5 className=" hover:delay-300 pl-2 hover:pl-4 duration-300 font-bold mt-4  hover:cursor-pointer">
              Sobre nosotros
            </h5>
          </div>
          <Searchbar />
          <Filters />
        </div>
      )}
    </nav>
  );
};

export default Header;
