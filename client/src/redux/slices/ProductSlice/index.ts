import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
export interface IReview {
  review: {
    id: string;
    rating: number;
    text: string;
    user: {
      username: string;
    }
  }
}

export interface ProductDetails {
  id: string;
  name: string;
  rating: number;
  description: string;
  price: Array<number>;
  image: string;
  stock: number;
  category: string;
  colors: Array<string>;
  sizes: Array<string>;
  quantity: number;
  reviews: Array<IReview>;
}

interface ProductState {
  productList: Array<ProductDetails>;
  productDetail: ProductDetails;
  carrouselList: Array<Object>;
  productPages: Number;
  loading: boolean;
  error: string;
  productListAdmin: Array<ProductDetails>
}

//Definimos el estado
const initialState: ProductState = {
  productList: [],
  carrouselList: [],
  productListAdmin:[],
  productDetail: {
    id: "",
    name: "",
    rating: -1,
    description: "",
    price: [],
    image: "",
    stock: 0,
    category: "",
    colors: [""],
    sizes: [""],
    quantity: 0,
    reviews: [],
  },
  productPages: 0,

  loading: false,
  error: "",
};
//PORCION DE ESTADO GLOBAL
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getProductList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productList = action.payload;
    },
    getProductAdminList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productListAdmin = action.payload;
    },
    getProductPages(state, action: PayloadAction<Number>) {
      state.productPages = action.payload;
    },
    getProductDetail(state, action: PayloadAction<ProductDetails>) {
      state.productDetail = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearProductLsit(state) {
      state.error = "";
      state.productList = [];
    },
    clearProductAdminList(state) {
      state.error = "";
      state.productListAdmin = [];
    },
    getBestOffersList(state, action: PayloadAction<Array<Object>>) {
      state.carrouselList = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const {
  getProductList,
  getProductPages,
  getProductDetail,
  setLoading,
  setError,
  clearProductLsit,
  getBestOffersList,
  getProductAdminList,
  clearProductAdminList,
} = ProductSlice.actions;
