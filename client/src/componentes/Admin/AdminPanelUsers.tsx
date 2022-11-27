import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllProducts } from "../../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import ProductsPanel from "./ProductsPanel/ProductsPanel";
import SearchBarUsers from "./SearchBarUsers";
import UsersPanel from './UsersPanel/UsersPanel'
const AdminPanelUsers = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <UsersPanel />
    </div>
  );
};

export default AdminPanelUsers;
