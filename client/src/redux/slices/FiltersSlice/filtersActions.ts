import { AppDispatch } from "../../store";
import { getProductPages } from "../ProductSlice";
import { getAllProducts, getAllProductsAdmin } from "../ProductSlice/productActions";
import { setFilters, setFiltersAdmin } from "./index";
import { Filters } from "./index";

export const setFiltersAction = (obj: Filters) => (dispatch: AppDispatch) => {
  dispatch(setFilters(obj));
  dispatch(getAllProducts(null, obj));
};

export const setFiltersActionAdmin = (page:Number, obj: Filters) => (dispatch: AppDispatch) => {
  dispatch(setFiltersAdmin(obj));
  dispatch(getAllProductsAdmin(null, obj));
  dispatch(getProductPages(page));
};