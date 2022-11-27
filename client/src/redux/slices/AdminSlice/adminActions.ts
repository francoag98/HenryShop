import axios from "axios";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import { setError, setLoading } from "../ProductSlice";
import { getUsersList, getUsersPages, getPayments, getPaymentsPages, setFiltersUsers, clearUsersList } from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;




export const getAllUsers = (page?: number | null, filters?: any) =>  (dispatch: AppDispatch) => {
    
    dispatch(setLoading(true));
    dispatch(clearUsersList());
    let url = `${URL_BACK_DEV}/users/admin/allusers?page=${page}&username=${filters?.username}&property=name&order=${filters?.order}`;

    axios
      .get(url)
      .then(({ data }) => {
        dispatch(getUsersList(data.docs));
        dispatch(getUsersPages(data.totalPages));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setError("Hubo un error cargando los productos. Recargue la página")
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
}

export const setFiltersActionUsers = ( page:Number, obj: any) => (dispatch: AppDispatch) => {
    dispatch(setFiltersUsers(obj));
    dispatch(getUsersPages(page));
    dispatch(getAllUsers(null, obj));
    
  };

export const getAllPayments = (page: number | null) => (dispatch: AppDispatch) => {
    let url;
    page ? url = `${URL_BACK_DEV}/shop/adminusers?page=${page}` : url = `${URL_BACK_DEV}/shop/adminusers`
    axios.get(url).then(({ data }) => {
        dispatch(getPayments(data.docs))
        dispatch(getPaymentsPages(data.totalPages))
    })

}  

// export const getProductsById =
//   (id: string | undefined) => (dispatch: AppDispatch) => {
//     axios
//       .get(`${URL_BACK_DEV}/products/${id}`)
//       .then(({ data }) => dispatch(getProductDetail(data)))
//       .catch((error) => {
//         console.error(error);
//       });
//   };
