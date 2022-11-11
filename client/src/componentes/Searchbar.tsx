import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setProductName } from "../redux/slices/ProductSlice";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getAllProducts(null, search));
    dispatch(setProductName(search));
    setSearch("");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={changeHandler}
        value={search}
        placeholder="Buscar producto..."
        className="text-base text-gray-900 p-2 pl-4 pr-4 rounded-3xl shadow-lg  border-0 border-b-2 border-black border-solid"
      />
      <button
        type="submit"
        className="text-base text-gray-900 p-2 pl-4 pr-4 bg-white ml-2 rounded-3xl duration-200 shadow-lg hover:bg-gray-200 hover:duration-300 border-b-2 border-black"
      >
        Buscar
      </button>
    </form>
  );
};

export default Searchbar;
