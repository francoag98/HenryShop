/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { uploadImageToFirebaseStorage } from "../../firebase/uploadImageToFirebaseStorage";
import { type } from "os";

let backData = process.env.REACT_APP_BACKEND_URL;
const sizes = { XS: "XS", S: "S", M: "M", L: "L", XL: "XL", XXL: "XXL" };
const colors = { Blanco: "Blanco", Negro: "Negro" };
interface formData {
  name: string;
  rating: number;
  description: string;
  price: number;
  // image: string;
  image: Array<string>;
  stock: number;
  category: string;
  colors: Array<string>;
  sizes: Array<string>;
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Debes agregar el nombre del producto"),
    rating: yup
      .number()
      .typeError("El rating debe ser un número")
      .min(0, "el número debe ser mayor o igual a 0")
      .max(5, "el número debe ser menor o igual a 5")
      .nullable()
      .transform((v, o) => (o === "" ? null : v)),
    description: yup
      .string()
      .min(1, "Se requiere por lo menos un caracter")
      .max(80, "No se pueden una descripción mayor a 80 caracteres")
      .required(),
    price: yup
      .number()
      .typeError("El precio debe ser un número")
      .min(0, "requiere un precio igual o superior a 0")
      .required("No olvides agregar el precio del prodcuto"),
    // image: yup.mixed().test("required", "Debe subir una imagen", (value) => {
    //   return value && value.length;
    // }),
    stock: yup
      .number()
      .typeError("Debes agregar el stock del producto")
      .min(0, "el valor mínimo debe ser cero")
      .required(),
    category: yup.string().required("Recuerda agregar la categoría"),
    colors: yup
      .array()
      .of(yup.string().oneOf(Object.values(colors)))
      .nullable(),
    sizes: yup
      .array()
      .of(yup.string().oneOf(Object.values(sizes)))
      .nullable(),
  })
  .required();

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const initialForm: formData = {
    name: "",
    rating: -1,
    description: "",
    price: -1,
    // image: "",
    image: [],
    stock: -1,
    category: "",
    colors: [""],
    sizes: [""],
  };
  const [input, setInput] = useState(initialForm);
  
  const [images, setImages] = useState<any>([]);
  const [link, setLink] = useState<any>([]);

  
  let newImage:any= [];
  let objectPost: any = {
    name: "",
    rating: 0,
    description: "",
    image: [""],
    price: 0,
    stock: 0,
    category: "",
    colors: [],
    sizes: []
  }
  const [postOb, setPostOb] = useState(objectPost);

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    e.preventDefault();
     if(e.target.files){
      for( let i = 0;  i < e.target.files.length; i++){
         newImage.push(e.target.files[i]);  
          newImage[i]["id"] =  Math.random();
          
      }
     }
     
     setImages(newImage);
  };
  
  
  
  const submitCall = async ({
    name,
    rating,
    description,
    price,
    stock,
    category,
    colors,
    sizes,
  }:formData) => {
    
   
    let imgUrl:any = await uploadImageToFirebaseStorage(images);
     console.log("imgurl", imgUrl);
     
     
     let object1 = {
        name: name,
    rating: rating,
    description:description,
    price: price,
    stock: stock,
    category: category,
    colors: colors,
    sizes: sizes
      };
    
      setLink(imgUrl[0]);
      setTimeout(function(){
        console.log("Hola Mundo");
    }, 2000);
      axios.post(`${backData}/products`,   {...object1, image: link}
        )
        .then((res) => {
          alert("Se creo el producto");
          console.log("res", res);
          console.log("link42", link)
          // window.location.reload();
        }
        )
        .catch((err) => console.error(err));
  }
  console.log("link1", link);

  


  useEffect(() => {
    
      
    
    
  }, [link, submitCall]);

  return (
    <form
      onSubmit={handleSubmit(submitCall)}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >

      
<div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("image")}
            id="image"
            type="file"
            multiple
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
            onChange={onChangeFiles}
          />
          *
        </div>
        {/* { input.image.length? 
           <div className="flex flex-wrap justify-start h-28 mt-4">
            
           { 
             <img
               className="h-full mr-4 border border-black border-solid rounded"
               src={input.image}
               alt={`upload_image_${input.image}`}
               key={input.image}

             />
           }
         </div>
        

          : null
        
        }  */}
        {/* {errors.image && (
          <p className="text-red-600 font-bold">{errors.image.message}</p>
        )} */}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Name..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        {errors?.name && (
          <p className="text-red-600 font-bold">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <input
          {...register("rating")}
          id="rating"
          type="text"
          placeholder="Rating..."
          className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
        />
        {errors?.rating && (
          <p className="text-red-600 font-bold">{errors.rating.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Description..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        {errors?.description && (
          <p className="text-red-600 font-bold">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("price")}
            id="price"
            type="text"
            placeholder="Price..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        {errors?.price && (
          <p className="text-red-600 font-bold">{errors.price.message}</p>
        )}
      </div>


      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("stock")}
            id="stock"
            type="text"
            placeholder="Stock..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        {errors?.stock && (
          <p className="text-red-600 font-bold">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <div className="flex justify-center">
          <input
            {...register("category")}
            id="category"
            type="text"
            placeholder="Category..."
            className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
          />
          *
        </div>
        {errors?.category && (
          <p className="text-red-600 font-bold">{errors.category.message}</p>
        )}
      </div>

      <div className="my-5 border border-black border-solid w-full rounded-2xl pl-2 py-1">
        Selecciona los colores
        <div className="my-2 flex justify-center">
          {Object.values(colors).map((color) => {
            return (
              <label key={color} htmlFor={color}>
                <div className="mx-5 ">
                  <input
                    value={color}
                    {...register("colors")}
                    id="colors"
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-blue-200 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label className="w-5/12">{color}</label>
                </div>
              </label>
            );
          })}
          {errors?.colors && (
            <p className="text-red-600 font-bold">{errors.colors.message}</p>
          )}
        </div>
      </div>
      <div className="my-5 border border-black border-solid w-full rounded-2xl pl-2 py-1">
        Selecciona la talla
        <div className="my-2 flex justify-center">
          {Object.values(sizes).map((size) => {
            return (
              <label key={size} htmlFor={size}>
                <div className="mx-5 ">
                  <input
                    value={size}
                    {...register("sizes")}
                    id="sizes"
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-blue-200 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label className="w-5/12">{size}</label>
                </div>
              </label>
            );
          })}
          {errors?.sizes && (
            <p className="text-red-600 font-bold">{errors.sizes.message}</p>
          )}
        </div>
      </div>
      <span>* Campos obligatorios</span>
      <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5 mb-8">
        Agregar producto
      </button>
    </form>
  );
};

export default Form;