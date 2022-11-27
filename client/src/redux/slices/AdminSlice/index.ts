import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetails } from "../ProductSlice";

//INTERFACES
export interface AdminUserDetail {
    confirmed: boolean;
    isAdmin: boolean;
    name: string;
    email: string;
    username:string;
    password: string;
    birthday: string;
    deleted: boolean;
    id: string;
  }
export interface Payments {
  userId: string;
  products: Array<ProductDetails>;
  id: string;
}
  interface AdminUserState {
    usersList: Array<AdminUserDetail>;
    userDetail: AdminUserDetail;
    userPages: Number;
    payments: Array<Payments>;
    paymentsPages: Number;
    filters: Object;
    error: string;
  }
//Definimos el estado
const initialState: AdminUserState = {
  usersList: [],
  userDetail: {
    confirmed: false,
    isAdmin: false,
    name: "",
    email: "",
    username: "",
    password: "",
    birthday: "",
    deleted: false,
    id: ""
  },
  userPages: 0,
  payments: [],
  paymentsPages: 0,
  filters: {
    username: "",
    property: "",
    order: "",
  },
  error: "",
};

//PORCION DE ESTADO GLOBAL
const AdminSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    // getProductList(state, action: PayloadAction<Array<UserDetail>>) {
    //   state.productList = action.payload;
    // },
    getUsersList(state, action: PayloadAction<Array<AdminUserDetail>>){
      state.usersList = action.payload;
    },
    clearUsersList(state) {
      state.error = "";
      state.usersList = [];
    },
    getUsersPages(state, action: PayloadAction<Number>){
       state.userPages = action.payload;
    },
    getPayments(state, action: PayloadAction<Array<Payments>>){
      state.payments = action.payload
    },
    getPaymentsPages(state, action: PayloadAction<Number>){
      state.paymentsPages = action.payload;
   },
   setFiltersUsers(state, action: PayloadAction<Object>) {
    state.filters = action.payload;
  },
  },
});

export default AdminSlice.reducer;
export const { getUsersList, getUsersPages, getPayments,setFiltersUsers, getPaymentsPages, clearUsersList} =
  AdminSlice.actions;
