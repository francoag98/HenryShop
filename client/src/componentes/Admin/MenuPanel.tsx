import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resourceLimits } from 'worker_threads';
import { BiUser } from 'react-icons/bi'
import {AiFillHome, AiOutlineShopping} from 'react-icons/ai'
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import { array } from 'yup';
const MenuPanel = () => {
    const REACT_APP_BACKEND_URL: string = process.env
    .REACT_APP_BACKEND_URL as string;
    let pathname = window.location.pathname;
    let hola = pathname.split('/')
    let path = hola[hola.length-1]
    const token = JSON.parse(
        window.localStorage.getItem("userSession") as string
      );
    const [userProps, SetUserProps] = useState('')
    useEffect(()=>{
        getUser();
    }, [])
    const getUser = async () => {
        const result = await axios.get(
          `${REACT_APP_BACKEND_URL}/users/getuser/${token?.username}`
        );
        SetUserProps(result.data.name);
      };
 let arraylado = ["0", "5", "10", "20"];
//     let cantidad = 0;
//     let lado = "t";
    
//     setTimeout(()=> {
//         if(cantidad >= 3){
//             cantidad = 0;
//             lado = arraylado[cantidad]
//         } else {
//         lado = arraylado[cantidad++]
//         }
//     }, 1000);
//   console.log(lado)
// const [currentSide, setCurrentSide] = useState(0)

// const nextImg = () => {
//     clearInterval(myInterval);
//     if(currentSide > arraylado.length ){
//         setCurrentSide(0);
//     }
//     setCurrentSide(currentSide === arraylado.length - 1 ? 0 : currentSide + 1);
//   };
// let myInterval: any;
// useEffect(() => {
//     myInterval = setInterval(nextImg, 3000);
//   }, [currentSide]);
//   console.log(arraylado[currentSide])
    return (
        <div className='invisible xl:visible rounded-br-xl flex flex-col h-screen bg-slate-700 flex-start justify-start xl:items-center text-white text-bold p-0 h-0 w-0 xl:h-auto xl:pb-4 xl:w-auto'>
               <div className={`relative flex flex-col items-center xl:px-4 xl:pt-4 xl:rounded-full xl:border-2 xl:border-yellow xl:border-opacity-80 xl:mt-4 xl:shadow-xl`} >
                 <BiUser className='xl:h-12 xl:w-12'/>
                 <h5 className='mb-4'>{userProps}</h5>
               </div>
            <h4 className=' border-b-2 mt-4 xl:pb-2 border-solid border-white xl:px-16 '>Panel</h4>
              <div className=' xl:pt-2 xl:mt-2 xl:px-5'>
                <Link to='/admin'>
                    <div className='flex flex-row items-center gap-1'>
                    <AiOutlineShopping className='h-5 w-5 mb-1'/>
                    <h5  className= {path == "admin" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-700 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Products</h5>
                    </div>
                </Link>
                <Link to='/admin/users'>
                  <div className='flex flex-row items-center gap-1'>
                       <BiUser className='h-5 w-5 mb-1'/>
                       <h5 className={path == "users" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-700 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Users</h5>
                  </div>
                </Link>

                <Link to='/admin/payments'>
                   <div className='flex flex-row items-center gap-1'>
                    <FaRegMoneyBillAlt className='h-5 w-5 '/>
                    <h5 className={path == "payments" ? 'border-b-2 border-solid border-gray-400 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300' : 'border-b-2 border-solid border-slate-700 hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'}>Payments</h5>
                    </div>
                </Link>
                   <div className='flex flex-row gap-1 mt-2 items-center'>
                    <AiFillHome className='h-6 w-6 mb-1'/>
                    <Link to='/'><h5 className='hover:cursor-pointer hover:border-b-2 hover:border-gray-400 hover:duration-400 duration-300'>Home</h5></Link>
                    </div>
            </div>
            {/* <h4 className=' border-t-2 mt-4 xl:pb-2 border-solid border-white xl:px-16 '>Rutas</h4> */}
   
        </div>
    );
};

export default MenuPanel;