import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setFiltersActionAdmin } from "../../../redux/slices/FiltersSlice/filtersActions"; 

const FiltersProductsAdmin = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filterState.filtersAdmin);
  const page = useAppSelector((state) => state.products.productPages);
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
    dispatch(setFiltersActionAdmin(page, { ...filters, [name]: value }));
  };

  const changeHandler = (e: any) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.selectedOptions[0].value;
    console.log(name, value);
    dispatch(setFiltersActionAdmin(page, { ...filters, [name]: value }));
  };

  const clickHandlerDelete = (e: any) => {
    const name = e.currentTarget.name;
    dispatch(setFiltersActionAdmin(page, { ...filters, [name]: "" }));
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
              {el.value === "price" && "Precio"}
              {el.value === "rating" && "Rating"}
              {el.value === "asc" && "Ascendente"}
              {el.value === "desc" && "Descendente"}
              {el.value === "Mate" && "Mates"}
              {el.value === "Gorra" && "Gorras"}
              {el.value === "Remera" && "Remeras"}
            </button>
          ))}
      </div>
      <div className="flex flex-row gap-4">
        <select
          className="p-2 text-base border-2 "
          id="property"
          onChange={(e) => {
            console.log(e);
            changeHandler(e);
          }}
        >
          <option className="text-sm" id="" value="">
            Propiedad
          </option>
          <option className="text-sm" id="property" value="rating">
            Rating
          </option>
          <option className="text-sm" id="property" value="price">
            Precio
          </option>
        </select>
        <select
          className="p-2 text-base "
          id="order"
          onChange={(e) => {
            console.log(e);
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

export default FiltersProductsAdmin;
