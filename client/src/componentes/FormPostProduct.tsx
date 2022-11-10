import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import axios from "axios";

interface formData{
    name: string;
    rating: number;
    description: string;
    price: number;
    image: string;
    stock: number;
    category: string;
    colors: Array<string>;
    sizes: Array<string>;
}


const schema = yup.object({
    name: yup.string().required('debes agregar el nombre del producto'),
    rating: yup.number().min(0).max(5),
    description: yup.string().min(1).max(80).required('Debe haber una descripción, máximo 80 caracteres'),
    price: yup.number().required('no olvides agregar el precio del prodcuto'),
    image: yup.string().required('tiene que ser un string'),
    stock: yup.number().required('debes agregar cantidad de stock'),
    category: yup.string().required('recuerda agregar la categoría'),
    colors: yup.array(),
    sizes: yup.array(),
})
.required();

const Form = () =>{
    const { register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver : yupResolver(schema)
    });
    
    const submitForm = handleSubmit((data) => {
        let backData = process.env.REACT_APP_BACKEND_URL;
        if (backData)
          axios.post(`${backData}/products/`, {}).then((res) => {
              console.log(res);
            })
            .catch((err) => console.error(err));
      });
    
    return (
        <div>
        <form onSubmit={submitForm}>
                <input {...register('name')} type="text" placeholder="Name..." />
                {errors?.name && (
                <p>{errors.name.message}</p>)}
        
                <input {...register('rating')} type="text" placeholder="Rating..."/>
                {errors?.rating && (
                <p>{errors.rating.message}</p>)}

                <input {...register('description')} type="text" placeholder="Description..."/>
                {errors?.description && (
                <p>{errors.description.message}</p>)}

                <input {...register('price')} type="text" placeholder="Price..."/>
                {errors?.price && (
                <p>{errors.price.message}</p>)}

                <input {...register('image')} type="text" placeholder="Image..."/>
                {errors?.image && (
                <p>{errors.image.message}</p>)}

                <input {...register('stock')} type="text" placeholder="Stock..."/>
                {errors?.stock && (
                <p>{errors.stock.message}</p>)}

                <input {...register('category')} type="text" placeholder="Category..."/>
                {errors?.category && (
                <p>{errors.category.message}</p>)}

                <input {...register('colors')} type="text" placeholder="Colors..."/>
                {errors?.colors && (
                <p>{errors.colors.message}</p>)}

                <input {...register('sizes')} type="text" placeholder="Sizes..."/>
                {errors?.sizes && (
                <p>{errors.sizes.message}</p>)}

                <button>Agregar producto</button>

        </form>
        </div>
    )

}

export default Form();