import React from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <ProductCards />
      <Pagination />
    </>
  );
};

export default Home;
