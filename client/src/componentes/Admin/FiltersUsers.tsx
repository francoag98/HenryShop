import React from "react";
import { object } from "yup";
import { useAppDispatch, useAppSelector  } from "../../hooks";
import { setFiltersActionUsers } from "../../redux/slices/AdminSlice/adminActions";
import { getAllProductsAdmin } from "../../redux/slices/ProductSlice/productActions";


const FiltersUsers = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.admin.filters);
  const page = useAppSelector((state) => state.admin.userPages)

  

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const name = e.currentTarget.id;
    const value = e.currentTarget.selectedOptions[0].value;
    console.log(name, value);
    dispatch(setFiltersActionUsers(page, { ...filters, [name]: value }));
  };

  

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full  mt-0  flex-wrap bg-gray-200 pt-2 pb-2">
      
      <div className="flex flex-row gap-4">

        
          <div className="p-2 text-base border-2 ">
          <label className="text-sm" id="property" >
            Name
          </label>
          </div>
        
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

export default FiltersUsers;