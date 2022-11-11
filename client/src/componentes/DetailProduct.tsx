import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {  useParams } from "react-router-dom";
import { getProductsById } from "../redux/slices/ProductSlice/productActions";
import { ProductDetails } from "../redux/slices/ProductSlice";


export const DetailProduct:React.FunctionComponent= () => {

    const producto = useAppSelector((state) => state.products.productDetail);
    const {id} = useParams();
    const dispatch = useAppDispatch();
     
    useEffect(() => {
    dispatch(getProductsById(String(id) ));
    
  }, [dispatch]);

    return (
        <div>
            
            <h2>{producto.name}</h2> 
            <p>Rating: {producto.rating}</p>
            <p>Description: {producto.description}</p>
            <p>Price: {producto.price}</p>
            <img src={producto.image} alt="Detalle Producto"/>
            <p>Stock: {producto.stock}</p>
            <p>Category: {producto.category}</p>
            <p>Colors: {producto.colors}</p>
            <p>Sizes: {producto.sizes}</p>

        </div>
        
    )
};