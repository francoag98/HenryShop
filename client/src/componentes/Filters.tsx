import React from "react";
import { object } from "yup";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFiltersAction } from "../redux/slices/FiltersSlice/filtersActions";

const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterState.filters);

  const filtersClean = () => {
    let arr = [];
    let key: keyof typeof filters;
    for (key in filters) {
      filters[key].length > 0 && arr.push({ name: key, value: filters[key] });
    }
    return arr;
  };

  const clickHandler = (e: any) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.name;
    dispatch(setFiltersAction({ ...filters, [name]: value }));
  };

  const changeHandler = (e: any) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.selectedOptions[0].value;
    dispatch(setFiltersAction({ ...filters, [name]: value }));
  };

  const clickHandlerDelete = (e: any) => {
    const name = e.currentTarget.name;
    dispatch(setFiltersAction({ ...filters, [name]: "" }));
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full  mt-6  flex-wrap bg-gray-200 pt-2 pb-2">
      <div className=" h-auto bg-white  rounded-3xl h-12 flex flex-row gap-2 w-auto flex flex-row ">
        {filters &&
          filtersClean().map((el) => (
            <button
              className="m-2 p-1 pl-2 pr-2 rounded-2xl border border-solid border-black text-sm  duration-300 hover:duration-300 hover:bg-gray-200 border-opacity-50 "
              name={el.name}
              key={el.name}
              onClick={clickHandlerDelete}
              id="renderFiltros"
            >
              {el.value === "currentPrice" && "Precio"}
              {el.value === "rating" && "Rating"}
              {el.value === "asc" && "Ascendente"}
              {el.value === "desc" && "Descendente"}
              {el.name === "category" && el.value}
              {el.name === "name" && el.value}
            </button>
          ))}
      </div>
      <div className="flex flex-row gap-4">
        <select
          className="p-2 text-base border-2 "
          id="property"
          onChange={(e) => {
            changeHandler(e);
          }}
        >
          <option className="text-sm" id="" value="">
            Propiedad
          </option>
          <option className="text-sm" id="property" value="rating">
            Rating
          </option>
          <option className="text-sm" id="property" value="currentPrice">
            Precio
          </option>
        </select>
        <select
          className="p-2 text-base "
          id="order"
          onChange={(e) => {
            changeHandler(e);
          }}
        >
          <option className="text-sm" value="">
            Orden
          </option>
          <option className="text-sm" value="asc">
            Ascendente
          </option>
          <option className="text-sm" value="desc">
            Descendente
          </option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
