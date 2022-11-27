import axios from "axios";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import {
  getProductList,
  getProductPages,
  getProductDetail,
  setLoading,
  setError,
  clearProductLsit,
  getBestOffersList,
  getProductAdminList,
  clearProductAdminList,
} from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;


export const getAllProductsAdmin = (page?: number | null, filters?: Filters) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(clearProductAdminList());
  let url = `${URL_BACK_DEV}/products/admin${page ? `?page=${page}` : "?page="}${
    filters?.name.length ? `&name=${filters.name}` : "&name="
  }${
    filters?.category.length ? `&category=${filters.category}` : "&category="
  }${
    filters?.property.length && !filters?.order.length
      ? `&property=${filters.property}&order=desc`
      : ""
  }${
    filters?.property.length && filters?.order.length
      ? `&property=${filters.property}&order=${filters.order}`
      : ""
  }`;
  // let url = `${URL_BACK_DEV}/products/admin${page ? `?page=${page}` : "?page="}&name=${filters?.name}&category=${filters?.category}&property=${filters?.property}&order=${filters?.order}`;

  axios
    .get(url)
    .then(({ data }) => {
      dispatch(getProductAdminList(data.docs));
      dispatch(getProductPages(data.totalPages));
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
};


export const getAllProducts =
  (page?: number | null, filters?: Filters) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearProductLsit());
    let url = `${URL_BACK_DEV}/products${page ? `?page=${page}` : "?page="}${
      filters?.name.length ? `&name=${filters.name}` : "&name="
    }${
      filters?.category.length ? `&category=${filters.category}` : "&category="
    }${
      filters?.property.length && !filters?.order.length
        ? `&property=${filters.property}&order=desc`
        : ""
    }${
      filters?.property.length && filters?.order.length
        ? `&property=${filters.property}&order=${filters.order}`
        : ""
    }`;

    axios
      .get(url)
      .then(({ data }) => {
        dispatch(getProductList(data.docs));
        dispatch(getProductPages(data.totalPages));
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
  };

export const getProductsById =
  (id: string | undefined) => (dispatch: AppDispatch) => {
    axios
      .get(`${URL_BACK_DEV}/products/${id}`)
      .then(({ data }) => {
        console.log(data)
        dispatch(getProductDetail(data))
      })
      .catch((error) => {
        console.error(error);
      });
  };

export const getBestOffers = () => (dispatch: AppDispatch) => {
  axios
    .get(`${URL_BACK_DEV}/carrousel/bestOffers`)
    .then(({ data }) => dispatch(getBestOffersList(data)))
    .catch((error) => {
      console.error(error);
    });
};
