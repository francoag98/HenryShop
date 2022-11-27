import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllProducts, getAllProductsAdmin } from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai"
import { getAllUsers } from "../../../redux/slices/AdminSlice/adminActions";
import axiosPutCall from "../../../funciones/axiosPutCall";
import {UsersCard} from "./UsersCard";
import SearchBarUsers from "../SearchBarUsers";
import FiltersUsers from "../FiltersUsers";
import { Filters } from "../../../redux/slices/FiltersSlice";
const UsersPanel = () => {
  let navigate = useNavigate();
  const routeChangeToEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let path = `/admin/${event.currentTarget.value}`;
    navigate(path);
  };
  const routeChangeToAddProduct = () => {
    let path = `/Createproduct`;
    navigate(path);
  };


  const dispatch = useAppDispatch();
  const Users = useAppSelector((state) => state.admin.usersList);
  const filters: Filters = useAppSelector((state) => state.admin.filters ) as Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [recharge, setRecharge] = useState("");
  useEffect(() => {
    dispatch(getAllUsers(currentPage, filters));
  }, [currentPage]);
  const Pages: number = useAppSelector((state) => state.admin.userPages) as number;
  var array: Array<number> = [];
  let id = 1;
  for (let i = 1; i <= Pages; i++) {
    array.push(i);
  }
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    var value = event.target.value;
    var x = value;
    var y: number = +x;
    setCurrentPage(y);
  };
  const token =
  JSON.parse(window.localStorage.getItem("userSession") as string) &&
  (JSON.parse(window.localStorage.getItem("userSession") as string)
    .token as string);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios.delete(`${URL_BACK_DEV}/users/${event.currentTarget.value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    } );
    dispatch(getAllUsers(currentPage, filters));
  };
  const handleEdit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };
  const handleActivate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axiosPutCall(`/users/admin/users/${event.currentTarget.value}`, {})
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrentPage(1);
    setRecharge("Hola");
    dispatch(getAllUsers(currentPage, {...filters,
      username: "",
      property: "",
      order: "",
    }))
  }
  
  return (
    <div className="flex justify-center items-center max-w-xs">
      <div className=" mt-8 mb-8 flex flex-col justify-center shadow">
      <FiltersUsers/>
      <SearchBarUsers/>
        <table className="shadow-2xl ">
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2">
            </th>
            
            <th></th>
            <th>
              Page:
              <select
                className="bg-gray-200 hover:bg-gray-400 rounded"
                onChange={(e) => handleOnChange(e)}
              >
                {Pages &&
                  array.map((pagina: number) => (
                    <option value={pagina}> {pagina}</option>
                  ))}
              </select>
              <button onClick={(e) => handleClick(e)}>f5</button>
            </th>
          </tr>
          <tr className="border border-black bg-slate-900	text-white rounded-xl ">
            <th className="border border-black font-normal p-2 pl-4 pr-4">ID</th>
            <th className="border border-black font-normal p-2">Username</th>
            <th className="border border-black font-normal p-2">name</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              Status
            </th>
          </tr>
         
          {Users &&
            Users.map((user) => (
              
              <UsersCard 
                pageId = {id++}
                username = {user.username} 
                name={user.name}
                handleActivate = {handleActivate}
                handleDelete = {handleDelete}
                deleted = {user.deleted}
                id = {user.id}

              />
             
            )) }
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
