import React from "react";
import { ProductDetails } from "../redux/slices/ProductSlice/";
import {Link } from "react-router-dom";
interface CardProps {
  product: ProductDetails;
}
const ProductCard: React.FC<CardProps> = ({ product }: CardProps) => {
  return (
    <div className="flex flex-col bg-gray-300  ml-10 mr-10 p-10 mt-6 mb-6 delay-75 hover:bg-gray-400 hover:scale-105 hover:duration-300  duration-300 rounded hover:cursor-pointer">
      <Link to={`/products/${product.id}`}>
      <h5 className="w-64 font-bold mb-4">{product.name}</h5>
      </Link>
      
      <img className="w-64" src={product.image} />
      <h6 className="flex items-start font-bold mt-4">
        Talles: {product.sizes.join(", ")}
      </h6>
      <h6 className="flex items-start">${product.price}</h6>
    </div>
  );
};

export default ProductCard;
