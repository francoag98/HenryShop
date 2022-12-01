import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPaymentById } from '../../redux/slices/AdminSlice/adminActions';
import Header from '../Header';
import MenuPanel from './MenuPanel';
import CardShop from '../User/ShoppingInfo/CardShop'
import { array } from 'yup';
const PaymentsDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const payment = useAppSelector(state => state.admin.paymentdetail)
    useEffect(()=>{
        dispatch(getPaymentById(id))
    }, [])
    // return (
    //     <div className="flex flex-col w-full">
    //     <Header />
    //     <div className="flex flex-row gap-x-12">
    //     <MenuPanel />
    //     <div className='rounded-md backdrop-blur-3xl bg-slate-900 text-white shadow-2xl  mt-10 p-6 mb-10'>
    //         <h4 className='border-b-2 border-solid border-gray-400'>DETALLES DEL PAGO</h4>
    //         <div className='flex flex-row gap-4'>
    //        <h5>User ID: {payment.userId}</h5>
    //        <h5>Fecha de compra: {payment.createdAt}</h5>
    //        </div>
    //        <h5>Productos: </h5>
    //        <div className='flex flex-row gap-2'>
    //        {payment.products.map(producto => {return (
    //         <div className='border-2 border-slate-800 my-4 bg-slate-800 bg-opacity-20 p-4 shadow-xl'>
    //         <h5>Name: {producto.name}</h5>
    //         <h5>Product ID: {producto.id}</h5>
    //         <h5>Precio: {producto.price}</h5>
    //         <img className="h-52 w-52"src={producto.image}/>
    //         </div>
    //        )}
    //        )
    //     }</div>
    //     </div>
    //     </div>
    //   </div>

    // );
        let total = 0;
    let arrayprices =  payment.products.map(prod => prod.total_Price);
    arrayprices.length ? total = arrayprices.reduce((Accumulator, current)=> Accumulator + current): total = arrayprices[0];

    return (
        <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-row gap-x-12">
        <MenuPanel />
        <div className='rounded-md backdrop-blur-3xl bg-transparent shadow-2xl  mt-10 mb-10 xl:w-10/12 mr-10'>
           <div className='bg-black bg-opacity-10 border-b-2 border-black border-opacity-20 shadow p-6'>
           <h4 className='border-b-2 border-solid border-black'>DETALLES DEL PAGO</h4>
            <div className='flex flex-row gap-4 mt-4'>
           <h5>User ID: {payment.userId}</h5>
           <h5>Fecha de compra: {payment.createdAt ? payment.createdAt.split('T')[0] : <></>}</h5>
           <h5>Hora: {payment.createdAt ? payment.createdAt.split('T')[1].slice(0, 8) : <></>}</h5>
           <h5>Total: ${total}</h5>
           </div>
           </div>
           <h5 className='py-4'>Productos: </h5>
           <div className='flex flex-col gap-2 mx-4'>
           {
              payment.products.length ? (
                payment.products.map((producto, index) => { return (
                    <div className='bg-black bg-opacity-10 shadow border-b-2 border-r-2 border-black border-opacity-20 mb-6'>
                     {<div className="flex justify-between border border--slate-500 px-8  rounded-b-xl w-full">        
                      <div className="pl-5">
                      <img
                      className="pt-2 rounded-tl-md rounded-tr-md w-40 hover:scale-105 hover:duration-300  duration-300 "
                      src={producto.image}
                      alt={"no hay"}
                      loading="lazy"
                    />
                    </div>
                    <div className="pt-6 w-1/3 ">
                    <div className="pt-5 pb-3  text-xl font-bold">{producto.name} <span className="px-2 text-xl text-slate-400">{producto.variante}</span>
                    </div>
                    <div className="pb-3" >Cantidad: {producto.quantity}
                    </div>
                    <div className="pb-3">Precio unitario: {producto.price}
                    </div>
                    </div>
                    <div className="w-48 pt-12 font-semibold">Descripción: <p className="pt-3 font-normal">{producto.description}</p></div>
              
              
              
              
                    </div>
                      } 
                      
                    </div>
              
                )}
                  )) : <></>
              } </div>
        </div>
        </div>
      </div>

    );

};

export default PaymentsDetail;