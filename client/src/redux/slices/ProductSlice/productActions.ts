import axios from "axios";
import { AppDispatch } from "../../store";
import { getProductList, getProductPages, setProductName, getProductDetail} from "./index";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://localhost:3001";

export const getAllProducts =
  (page?: number | null, name?: string | null) => (dispatch: AppDispatch) => {
    let url = null;
    if (page && name) {
      url = `${BACKEND_URL}/products?page=${page}&name=${name}`;
    } else if (page) {
      url = `${BACKEND_URL}/products?page=${page}`;
    } else if (name) {
      url = `${BACKEND_URL}/products?name=${name}`;
    } else {
      url = `${BACKEND_URL}/products`;
    }
    axios
      .get(url)
      .then(({ data }) => {
        dispatch(getProductList(data.docs));
        dispatch(getProductPages(data.totalPages));
        name && dispatch(setProductName(name));
      })
      .catch((error) => {
        console.error(error);
      });
  };

export const getProductsById = (id: string) => (dispatch: AppDispatch) => {
  axios
    .get(`${BACKEND_URL}/products/${id}`)
    .then(({ data }) => dispatch(getProductDetail(data)))
    .catch((error) => {
      console.error(error);
    });
};