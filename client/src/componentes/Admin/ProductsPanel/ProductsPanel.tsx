import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllProducts, getAllProductsAdmin } from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { BiEdit, BiX } from "react-icons/bi";
import FiltersProductsAdmin from "./FiltersProductsAdmin";
import SearchBarProducts from "./SearchBarProducts";
const ProductsPanel = () => {
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
  const Products = useAppSelector((state) => state.products.productListAdmin);
  let id = 1;
  const filters = useAppSelector((state) => state.filterState.filtersAdmin);
  const { productPages } = useAppSelector((state) => state.products);
  var array: Array<number> = [];
  for (let i = 1; i <= productPages; i++) {
    array.push(i);
  }
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getAllProductsAdmin(currentPage, filters));
  }, [currentPage]);
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    var value = event.target.value;
    var x = value;
    var y: number = +x;
    setCurrentPage(y);
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios.delete(`${URL_BACK_DEV}/products/${event.currentTarget.value}`);
    dispatch(getAllProductsAdmin(currentPage, filters));
  };
  const handleEdit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="flex justify-center items-center max-w-xs">
      <div className=" mt-8 mb-8 flex flex-col justify-center shadow">
        <FiltersProductsAdmin/>
        <SearchBarProducts/>
        <table className="shadow-2xl ">
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2">
              <button
                onClick={routeChangeToAddProduct}
                className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded hover:duration-500 duration-300"
              >
                ADD
              </button>
            </th>
            <th></th>
            <th>
              Page:
              <select
                className="bg-gray-200 hover:bg-gray-400 rounded"
                onChange={(e) => handleOnChange(e)}
              >
                {productPages &&
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
            <th className="border border-black font-normal p-2">Nombre</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">Precio</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">Actions</th>
          </tr>
          {Products &&
            Products.map((producto) => (
              <tr className="border border-slate-300">
                <td
                  className={
                    id % 2 !== 0
                      ? "bg-gray-200 border-black"
                      : "bg-gray-300 border-black"
                  }
                >
                  {id++}
                </td>
                <td
                  className={
                    id % 2 !== 0
                      ? "max-w-1/3 bg-gray-300  border-black"
                      : "max-w-1/3 bg-gray-200  border-black"
                  }
                >
                  {<p className="text-xs font-bold">{producto.name}</p>}
                  
                </td>{" "}
                
                <td
                  className={
                    id % 2 !== 0
                      ? " flex items-center justify-center bg-gray-300 p-2 border-black"
                      : " flex  items-center justify-center bg-gray-200 p-2 border-black"
                  }
                >
                  {<p className="text-xs font-bold items-center justify-center p-3 m-3 ">{producto.price}</p>}
                  <button
                    onClick={(e) => handleDelete(e)}
                    value={producto.id}
                    className="w-12 h-12 p-3 m-3 bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                  >
                    <BiX className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => routeChangeToEdit(e)}
                    value={producto.id}
                    className="w-12 h-12 p-3 m-3  items-center justify-center bg-amber-500 hover:bg-amber-700 text-white font-bold  border border-amber-700 rounded hover:duration-500 duration-300"
                  >
                    <BiEdit className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default ProductsPanel;
