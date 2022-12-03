import React, { useEffect, useState } from "react";
import CardShop from "./CardShop"
import { getAllShoppingByUser, getDateShopping } from "../../../redux/slices/ShoppingSlice/shoppingActions";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Header from "../../Header";
import axiosGetCall from '../../../funciones/axiosGetCall';
import {ShoppingDetails} from '../../../redux/slices/ShoppingSlice/index';

const ShoppingCards = () => {
  const dispatch = useAppDispatch();
  const { shoppingList } = useAppSelector(
    (state) => state.shopping
  );
  const { shoppingDate } = useAppSelector(
    (state) => state.shopping
  )
  const [user, setUser] = useState({shopping:[]});
  const [shopsByUser, setShopsByUser] = useState([]);
  const [total, setTotal] = useState<ShoppingDetails[]>([{
      id: '',
      color: '',
      name: '',
      quantity: 0,
      price: 0,
      total_Price: 0,
      image: '',
      variante: '',
      idShop: '',
      description: '',
    }]);
  const session =JSON.parse(window.localStorage.getItem("userSession") as string);

  const getShopsByUser = () => {
    const result = user?.hasOwnProperty("shopping")? user.shopping:[];
    setShopsByUser(result);
  }
  const getTotal = () => {
    const totalValue = shopsByUser.length?shopsByUser.map(id => {
      return shoppingList.filter(a => a.idShop === id)
    }).flat(): [];
    setTotal(totalValue);
  }

  const getUser = async() =>{
    if(session.origin === "default") {
      const {data} = await axiosGetCall(`/users/${session.username}`);
      setUser(data);
    }
    if(session.origin === "google") {
      const {data} = await axiosGetCall(`/googleusers/${session.email}`);
      setUser(data);
    }
    if(session.origin === "github") {
      const {data} = await axiosGetCall(`/githubusers/${session.username}`);
      setUser(data);
    }
  };

  useEffect(() => {
    if(session.origin === "default") {
      dispatch(getAllShoppingByUser(session.username, session.origin));
    }
    if(session.origin === "google") {
      dispatch(getAllShoppingByUser(session.email, session.origin));
    }
    if(session.origin === "github") {
      dispatch(getAllShoppingByUser(session.username, session.origin));
    }
  }, []);

  useEffect(() => {
    getTotal();
  }, [shoppingList, shopsByUser]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getShopsByUser();
  }, [user]);

  useEffect(() => {
     if(session.origin === "default") {
      dispatch(getDateShopping(session.username, session.origin));
    }
    if(session.origin === "google") {
      dispatch(getDateShopping(session.email, session.origin));
    }
    if(session.origin === "github") {
      dispatch(getDateShopping(session.username, session.origin));
    }
  }, [shopsByUser]);


  return (
    <div className="w-full">
      <Header/>
    <div className="flex w-full justify-center">
      <div>
      {
        total.length ? (
          total.map((producto, index) => 
            <div key={index} className = "my-3 w-[55rem] border border-slate-200 rounded-xl shadow-lg">
              <div className = "flex justify-between bg-slate-200 h-20 rounded-t-xl">
                <div className = "flex w-2/3 bg-slate-400 rounded-tl-xl">
                  <div className="px-20 pt-4"> FECHA DE PEDIDO: <p>{shoppingDate.map((e:any) => e.id === producto?.idShop 
                  ? e.createdAt.substring(0,10)
                  : "" )}</p>
                </div>
                  <div className="pl-10 pt-4 "> TOTAL DE COMPRA: 
                    <p>ARS {producto.total_Price}</p>
                  </div>
                </div>
                <div className="px-10 pt-4 bg-slate-400 rounded-tr-xl" > PEDIDO N° 
                  <p> {producto.idShop}</p>
                </div>
              </div>
              <div> 
                <CardShop  products={producto} />
              </div>
            </div>
          )

          ) : (
            <div className="text-xl pt-40">
              <p>Aún no tienes compras registradas... <p className="text-3xl pt-10 font-medium">...Anímate, los productos están geniales!</p></p>
            </div>
          )}
      </div>
    </div>
    </div>
  );
};
//<p>{shoppingList[0].products[0].name}</p>
export default ShoppingCards;