import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import henryShop from "../../assets/henryShop.png"
import Footer from "../Footer";


interface formData {
  buyer_name:String;
  product_name: String;
  reason: String;
  customer_email: String;
  quantity: Number;
  purchase_id: String;
  }
const schema = yup.object().
shape({
      buyer_name: yup.string().min(3, "Ingresar un nombre valido").max(100).required("El nombre de comprador es necesario"),
      product_name:yup.string().min(3, "Ingresar un nombre valido").max(100).required("El nombre del producto es necesario"),
      reason: yup.string().min(5, "el motivo tiene que tener al menos dos palabras").max(1000).required("El motivo de devolución es necesario"),
      customer_email: yup.string().email().required("El email de la compra es necesario"),
      quantity: yup.number().typeError("La cantidad minima es de 1").min(1).required("Ingrese la cantidad a devolver"),
});
export const Refunds = () => {
   const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm<formData>({
    resolver: yupResolver(schema),
    });
    const { id } = useParams();
    const submitCall = async ({
      buyer_name,
      product_name,
      reason,
      customer_email,
      quantity,
      }:formData) => {
        let backData = process.env.REACT_APP_BACKEND_URL;
       
    
        if (backData )
          axios
            .post(`${backData}/refund`, {
            buyer_name,
            product_name,
            reason,
            customer_email,
            quantity,
            purchase_id: id,
            })
            .then((res:any) => {
              alert("Formulario de devolucion creado");
              navigate("/formcreated")
              //agregar navigate a una pagina que diga "el form fue creado con un boton para el homey otro para hacer otra devolu"
            }
            )
            .catch((err:any) =>{
              alert(`${err.response.data}`);
              console.log(err);
            });
      }
    return (
      <>
        <Header/>
        <form
          onSubmit={handleSubmit(submitCall)}
          className="flex justify-center flex-col w-2/3 items-center max-w-[600px] m-auto xl:mt-32 xl:mb-32 mt-20 mb-20"
        >
          <div>
            <img className="mb-6" src={henryShop} alt="Logo_henry" />
          </div>
          <h2 className="mb-6">Formulario de devoluciones</h2>
          <div className="mb-3.5 w-full">
          <div className="flex justify-center">
          <input {...register("buyer_name")} id="buyername" type="text" className="border border-black border-solid w-full rounded-sm pl-2 py-1"  placeholder="Nombre y Apellido"/>
          </div>
          {errors?.buyer_name && <p className="text-red-600 font-bold">{errors.buyer_name.message}</p>}
          </div>  


          <div className="mb-3.5 w-full">
          <input {...register("product_name")} className="border border-black border-solid w-full rounded-sm pl-2 py-1" id="productname" type="text" placeholder="Nombre del producto"/>
          {errors?.product_name && <p className="text-red-600 font-bold">{errors.product_name.message}</p>}
          </div>

          <div className="mb-3.5 w-full">
          <div className="flex justify-center">
          <textarea {...register("reason")} className="border border-black border-solid w-full rounded-sm pl-2 py-1 h-20" id="reason" placeholder="Motivo de devolución"/>
          </div>
          {errors?.reason && <span className="text-red-600 font-bold">{errors.reason.message}</span>}
          </div>

          <div className="mb-3.5 w-full">
          <div className="flex justify-center">
          <input {...register("customer_email")} id="customer_email" className="border border-black border-solid w-full rounded-sm pl-2 py-1" type="text" placeholder="Email de la cuenta"/>
          
          </div>
          {errors?.customer_email && <span className="text-red-600 font-bold">{errors.customer_email.message}</span>}
          </div>

          <div className="mb-3.5 w-full">
          <div className="flex justify-center">
          <input {...register("quantity")} id="quantity" type="number" defaultValue={1} className="border border-black border-solid w-full rounded-sm pl-2 py-1" placeholder="cantidad a devolver"/>
          </div>
          {errors?.quantity && <p className="text-red-600 font-bold">{errors.quantity.message}</p>} 
          </div>

          <div className="mb-3.5 w-full">
         <div className="flex justify-center">
         <label className="border border-black border-solid w-full rounded-sm pl-2 py-1" id="purchase_id">Id de la compra: {id}</label>
         </div>
         </div>
         <button className="bg-yellow w-fit p-2 hover:bg-black hover:text-yellow hover:duration-500 duration-300 rounded-sm font-bold my-1.5 mb-8" >Enviar</button>
        
        </form>
        <Footer/>
        </>
        
      )

};