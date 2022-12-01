import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";
import ProductCard from "./ProductCard";
import { Loading } from "./Loading";
import { AnyARecord } from "dns";
// const gifLoading = require("../assets/gifLoading.gif");

const ProductCards = () => {
  const { filters } = useAppSelector((state) => state.filterState);
  const { productList, loading, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts(null, filters));
  }, [dispatch, filters]);

  if (loading) {
    return <Loading />;
  }

  if (error) return <h3 className="lg:w-6/12">{error}</h3>;

  const width: any = window.innerWidth;
  return width > 800 ? (
    <div className="grid grid-cols-3 gap-16 bg-gray-200 p-10 rounded-2xl mb-4">
      {productList.length ? (
        productList.map((producto, index) => {
          return <ProductCard key={index} product={producto} />;
        })
      ) : (
        <div>
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center">
      {productList.length ? (
        productList.map((producto, index) => {
          return <ProductCard key={index} product={producto} />;
        })
      ) : (
        <div>
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
