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
import {getCategories} from "../../redux/slices/ProductSlice/productActions";

const variants = { XS: "XS", S: "S", M: "M", L: "L", XL: "XL", XXL: "XXL" };
const colors = { Blanco: "Blanco", Negro: "Negro" };
interface formData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const schema = yup
  .object({
    name: yup.string().required("Debes agregar el nombre del producto"),
    description: yup
      .string()
      .min(0, "Se requiere por lo menos un caracter")
      .max(80, "No se pueden una descripción mayor a 80 caracteres")
      .required(),
    price: yup
      .number()
      .typeError("El precio debe ser un número")
      .min(0, "requiere un precio igual o superior a 0")
      .required("No olvides agregar el precio del prodcuto"),
    image: yup.string().required("Agrega un enlace de tu imagen"),
    category: yup.string().required("Recuerda agregar la categoría"),
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
    category: "",
  };

  const [variantsInput, setVariantsInput] = useState<variant[]>(Product.variants);
  const [variantsError, setVariantsError] = useState('');
  const [variantName, setVariantName] = useState(Product.variantName);

  const [newVariant, setNewVariant] = useState<string>('');

  const categories = useAppSelector((state) => state.products.categoryList?.map(category => category.name));

  const [defaultCategory, setDefaultCategory] = useState({id:'', name: ''});

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
    const variantToAdd = newVariant.split('|');
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

  const getDefaultCategory = async () => {
    const {data} = await axios.get(`${backData}/categories/${Product.category}`);
    setDefaultCategory(data);
  };

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
    category,
  }: formData) => {
    imgUrl = await uploadImageToFirebaseStorage(file);
    if (imgUrl && backData) {
      axios
        .put(`${backData}/products/${id}`, {
          name,
          description,
          price,
          image: imgUrl,
          category,
          variants: variantsInput,
          variantName,
        })
        .then((res) => {
          console.log(res);
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
          category,
          variants: variantsInput,
          variantName,
        })
        .then((res) => {
          console.log(res);
          alert("Se actualizo el producto");
          navigate("/admin");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCategories = (event:React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === 'all') return ;

    setInput({...input, category: event.target.value}); 
  }

  useEffect(() => {
    console.log(Product);
  }, [Product]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductsById(id));
    getDefaultCategory();
  }, []);
  
  if(Product !== undefined) {
    if(Product.price.at(-1)!==undefined && defaultCategory?.name?.length > 0)return (
      <form
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
              className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
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
              className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
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
              className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
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
              className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
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
  
        <div className="mb-3.5 w-full">
          <div className="flex justify-center">
            
            <select {...register('category')} onChange = {handleCategories}>
              <option value = {defaultCategory.hasOwnProperty('name')?defaultCategory.name:"All"}>
                {defaultCategory.hasOwnProperty('name')?defaultCategory.name:"All"}
              </option >
              {categories?.map(category => {
                return(<option key = {category} value = {category}>{category}</option>)
              })}
            </select>*
          </div>
          {errors?.category && (
            <p className="text-red-600 font-bold">{errors.category.message}</p>
          )}
        </div>
  
        <div className="my-5 border border-black border-solid w-full rounded-2xl pl-2 py-1">
          Variantes del producto
          <div className="my-2 flex justify-center">
            <input name = "variant" value = {variantName} placeholder="Coloca el nombre del conjunto de variantes" onChange = {(event)=> setVariantName(event.target.value)}/>
            <ListDisplayer elements = {variantsInput} setState = {handleVariants} name = "Variantes agregadas"/>
            <input name="variantes" onChange = {(event) => setNewVariant(event.target.value)} value = {newVariant}/>
            <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5 mb-8" onClick = {handleNewVariant}>Agregar</button>
          </div>
          {variantsError.length?(<p className="text-red-600 font-bold">{variantsError}</p>):null}
        </div>
        <span>* Campos obligatorios</span>
        <button className="my-5 bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">
          Editar producto
        </button>
      </form>
      );
    else return (<></>);
  }else return (<></>);
};

export default FormPutProduct;
function async(
  arg0: ({
    name,
    description,
    price,
    image,
    category,
  }: formData) => void
) {
  throw new Error("Function not implemented.");
}
