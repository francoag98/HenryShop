import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getAllProducts,
  getAllProductsAdmin,
} from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { getAllUsers } from "../../../redux/slices/AdminSlice/adminActions";
import axiosPutCall from "../../../funciones/axiosPutCall";
import SearchBarUsers from "../SearchBarUsers";
import FiltersUsers from "../FiltersUsers";
import { Filters } from "../../../redux/slices/FiltersSlice";
import Swal from "sweetalert2";
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
  const filters: Filters = useAppSelector(
    (state) => state.admin.filters
  ) as Filters;
  const [currentPage, setCurrentPage] = useState(1);
  const [recharge, setRecharge] = useState("");
  useEffect(() => {
    dispatch(getAllUsers(currentPage, filters));
  }, [currentPage]);
  const Pages: number = useAppSelector(
    (state) => state.admin.userPages
  ) as number;
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
    await axios
      .delete(`${URL_BACK_DEV}/users/${event.currentTarget.value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> El usuario fue <h4 style='color: #DD2E2E; font-weight: 700'>deshabilitado</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `<h4>No se ha podido deshabilitar el usuario!, ${err.message}</h4>`,
          timer: 2000,
        });
      });
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
      .then((res) => {
        Swal.fire({
          icon: "success",
          title:
            "<h4> El usuario fue <h4 style='color: #008000; font-weight: 700'>habilitado</h4></h4>",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `<h4>No se ha podido habilitar el usuario!, ${err.message}</h4>`,
          timer: 2000,
        });
      });
    dispatch(
      getAllUsers(currentPage, {
        ...filters,
        username: "",
        property: "",
        order: "",
      })
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrentPage(1);
    setRecharge("Hola");
    dispatch(
      getAllUsers(currentPage, {
        ...filters,
        username: "",
        property: "",
        order: "",
      })
    );
  };

  //   return (
  //     <div className="flex justify-center items-center max-w-xs">
  //       <div className=" mt-8 mb-8 flex flex-col justify-center shadow">
  //       <FiltersUsers/>
  //       <SearchBarUsers/>
  //         <table className="shadow-2xl ">
  //           <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
  //             <th className="p-2">
  //             </th>

  //             <th></th>
  //             <th></th>
  //             <th>
  //               Page:
  //               <select
  //                 className="bg-gray-200 hover:bg-gray-400 rounded"
  //                 onChange={(e) => handleOnChange(e)}
  //               >
  //                 {Pages &&
  //                   array.map((pagina: number) => (
  //                     <option value={pagina}> {pagina}</option>
  //                   ))}
  //               </select>
  //               <button onClick={(e) => handleClick(e)}>f5</button>
  //             </th>

  //           </tr>
  //           <tr className="border border-black bg-slate-900	text-white rounded-xl ">
  //             <th className="border border-black font-normal p-2 pl-4 pr-4">ID</th>
  //             <th className="border border-black font-normal p-2">Username</th>
  //             <th className="border border-black font-normal p-2">name</th>
  //             <th className="border border-black font-normal p-2 pl-4 pr-4">
  //               Status
  //             </th>
  //           </tr>

  //           {Users &&
  //             Users.map((user) => (

  //               <UsersCard
  //                 pageId = {id++}
  //                 username = {user.username}
  //                 name={user.name}
  //                 handleActivate = {handleActivate}
  //                 handleDelete = {handleDelete}
  //                 deleted = {user.deleted}
  //                 id = {user.id}

  //               />

  //             )) }
  //         </table>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div className="flex justify-center items-center xl:w-10/12">
      <div className=" mt-8 mb-8 flex flex-col justify-center shadow xl:w-10/12">
        <FiltersUsers />
        <SearchBarUsers />
        <table className="shadow-2xl ">
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2"></th>
            <th></th>
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
            </th>
          </tr>
          <tr className="border border-black bg-slate-900	text-white rounded-xl ">
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              ID
            </th>
            <th className="border border-black font-normal p-2">Username</th>
            <th className="border border-black font-normal p-2">Name</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              Status
            </th>
          </tr>
          {Users &&
            Users.map((user) => (
              <tr className="border border-slate-300 ">
                <td
                  className={
                    user.deleted
                      ? "bg-gray-300 border-black text-white"
                      : "bg-gray-200 border-black"
                  }
                >
                  {id++}
                </td>
                <td
                  className={
                    user.deleted
                      ? "bg-gray-300 border-black text-white"
                      : "bg-gray-200 border-black"
                  }
                >
                  {<p className="text-xs font-bold">{user.username}</p>}
                </td>{" "}
                <td
                  className={
                    user.deleted
                      ? "bg-gray-300 border-black text-white"
                      : "bg-gray-200 border-black"
                  }
                >
                  {<p className="text-xs font-bold">{user.name}</p>}
                </td>{" "}
                <td
                  className={
                    user.deleted
                      ? "bg-gray-300 border-black text-white"
                      : "bg-gray-200 border-black"
                  }
                >
                  {user.deleted ? (
                    <button
                      onClick={(e) => handleActivate(e)}
                      value={user.id}
                      className="  margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                    >
                      <BiX className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleDelete(e)}
                      value={user.id}
                      className="margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-green-500 hover:bg-green-700 text-white font-bold  border border-green-700 rounded hover:duration-500 duration-300"
                    >
                      <AiOutlineCheck className=" w-4 h-4 ml-1" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};
export default UsersPanel;
