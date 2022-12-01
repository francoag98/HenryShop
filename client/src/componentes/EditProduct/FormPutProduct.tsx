/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { getProductsById } from "../../redux/slices/ProductSlice/productActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImageToFirebaseStorage } from "../../firebase/uploadImageToFirebaseStorage";
import ListDisplayer from "../ListDisplayer";
import { variant } from "../../Types";

interface formData {
  name: string;
  description: string;
  price: number;
  image: string;
}

const schema = yup
  .object({
    name: yup.string().required("Debes agregar el nombre del producto"),
    description: yup
      .string()
      .min(0, "Se requiere por lo menos un caracter")
      .max(200, "No se pueden una descripción mayor a 80 caracteres")
      .required(),
    price: yup
      .number()
      .typeError("El precio debe ser un número")
      .min(0, "requiere un precio igual o superior a 0")
      .required("No olvides agregar el precio del prodcuto"),
    image: yup.string().required("Agrega un enlace de tu imagen"),
  })
  .required();

// --------------------------------------------------------------------------------------

const FormPutProduct = () => {
  const backData = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const Product = useAppSelector((state) => state.products.productDetail);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });
  const initialForm: formData = {
    name: "",
    description: "",
    price: 0,
    image: "",
  };

  const [variantsInput, setVariantsInput] = useState<variant[]>(Product.variants);
  const [variantsError, setVariantsError] = useState('');
  const [variantName, setVariantName] = useState(Product.variantName);

  const [newVariant, setNewVariant] = useState<string>('');

  const handleVariants = (value:variant) => {
    let variantsInputCopy:variant[] = typeof variantsInput !== 'string'? variantsInput: [{value: "", quantity: 0}];
    if(variantsInput.includes(value)){
      variantsInputCopy.every((filter, index) => {
        if(filter === value){
          setVariantsInput(current => variantsInputCopy.filter(element => element !== value ));
          return false;
        }
        return true;
      });
    }else{
      variantsInputCopy = [...variantsInputCopy, value];
      setVariantsInput(variantsInputCopy);
    }
  };


  const handleNewVariant = (event:any) => {
    event.preventDefault();
    
    const variantToAdd = newVariant.toUpperCase().split(' ').join("").split("|");
    if(variantToAdd.length === 2 && !isNaN(Number(variantToAdd[1]))) {
      const variantToObject:variant = {
        value:variantToAdd[0],
        quantity:Number(variantToAdd[1])
      } 
      if(!variantsInput.map(e => e.value).includes(variantToObject.value)){
        handleVariants(variantToObject);
        setNewVariant('');
        setVariantsError('');
      }else{
        setVariantsError("Valor ya ingresado");
      }
    }else{
      setVariantsError('Valor ingresado no valido');
    }
  }

  const [input, setInput] = useState(initialForm);
  const [imgTemp, setImgTemp] = useState("");
  const [file, setFile] = useState(null);

  let imgUrl: any;
  let imgSrc: any;
  let imgFile: any;

  

  const imagePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    imgSrc = target.files?.[0];
    setFile(imgSrc);
    let arr: string = "";

    imgFile = URL.createObjectURL(imgSrc);
    arr = imgFile;
  };
  const submitForm = async ({
    name,
    description,
    price,
    image,
  }: formData) => {
    imgUrl = await uploadImageToFirebaseStorage(file);
    if (imgUrl && backData) {
      axios
        .put(`${backData}/products/${id}`, {
          name,
          description,
          price,
          image: imgUrl,
          variants: variantsInput,
          variantName,
        })
        .then((res) => {
          alert("Se actualizo el producto");
          navigate("/admin");
        })
        .catch((err) => console.error(err));
    } else if (!imgUrl && backData) {
      axios
        .put(`${backData}/products/${id}`, {
          name,
          description,
          price,
          variants: variantsInput,
          variantName,
        })
        .then((res) => {
          alert("Se actualizo el producto");
          navigate("/admin");
        })
        .catch((err) => console.error(err));
    }
  };


  useEffect(() => {
    dispatch(getProductsById(id));
    
  }, []);

  useEffect(() => {
    setVariantName(Product.variantName);
    setVariantsInput(Product.variants);
  }, [Product]);
  return Product && Product.price.at(-1) !== undefined ?  <form
  onSubmit={handleSubmit(submitForm)}
  className="flex justify-center flex-col items-center w-9/12 m-auto"
>
  <div className="mb-3.5 w-full">
    <div className="flex justify-center">
      <input
        {...register("name")}
        id="name"
        type="text"
        placeholder="Name..."
        className="border border-black border-solid w-full rounded-sm pl-2 py-1"
        defaultValue={`${Product.name}`}
      />
      *
    </div>
    {errors?.name && (
      <p className="text-red-600 font-bold">{errors.name.message}</p>
    )}
  </div>

  <div className="mb-3.5 w-full">
    <div className="flex justify-center">
      <input
        {...register("description")}
        id="description"
        type="text"
        placeholder="Description..."
        className="border border-black border-solid w-full rounded-sm pl-2 py-1"
        defaultValue={`${Product.description}`}
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
        className="border border-black border-solid w-full rounded-sm pl-2 py-1"
        defaultValue={`${Product.price[Product.price.length - 1]}`}
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
        {...register("image")}
        id="image"
        type="file"
        onChange={(e) => imagePreview(e)}
        placeholder="Image..."
        className="border border-black border-solid w-full rounded-sm pl-2 py-1"
      />
      *
    </div>
    <div>
      {imgTemp ? (
        <div>
          <p>
            {" "}
            Imagen nueva <img className="h-40 " src={imgTemp} />{" "}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
    <div>
      {Product.image ? (
        <div>
          <p>
            {" "}
            Imagen actual <img className="h-40 " src={Product.image} />{" "}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
    {errors?.image && (
      <p className="text-red-600 font-bold">{errors.image.message}</p>
    )}
  </div>

  <div className="my-5 border border-black border-solid w-full rounded-sm pl-2 py-1">
    Variantes del producto
    <div className="my-2 flex flex-col items-center justify-center">
      <input className = "w-8/12 mt-4 border border-black border-solid" name = "variant" value = {variantName} placeholder="Coloca el nombre del conjunto de variantes" onChange = {(event)=> setVariantName(event.target.value)}/>
      <input className = "w-8/12 mt-4 border border-black border-solid"  name="variantes" onChange = {(event) => setNewVariant(event.target.value)} placeholder = "agrega nueva variante..." value = {newVariant}/>
      <button className="border-b-2 border-black mt-4 duration-300 hover:bg-gray-200 hover:duration-300 w-1/3 py-2 rounded-sm bg-yellow font-bold my-1.5 mb-8" onClick = {handleNewVariant}>Agregar</button>
      <ListDisplayer elements = {variantsInput} setState = {handleVariants} name = "Variantes agregadas"/>
    </div>
    {variantsError.length?(<p className="text-red-600 font-bold">{variantsError}</p>):null}
  </div>
  <span>* Campos obligatorios</span>
  <button className="w-fit px-2 py-2 rounded-sm font-bold my-1.5 duration-300 hover:bg-gray-200 hover:duration-300 py-2 rounded-sm bg-yellow font-bold my-1.5 mb-8">
    Editar producto
  </button>
</form>
 : <p>no hay producto</p>
 
      
};

export default FormPutProduct;
function async(
  arg0: ({
    name,
    description,
    price,
    image,
  }: formData) => void
) {
  throw new Error("Function not implemented.");
}
