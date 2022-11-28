import React, { useEffect } from "react";
import CardShop from "./CardShop"
import { getAllShoppingByUser, getDateShopping } from "../../../redux/slices/ShoppingSlice/shoppingActions";
import { getUserByUsername } from "../../../redux/slices/AdminSlice/adminActions";
import { setUserData } from "../../../redux/slices/UserSlice/UserActions";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../Header";

const ShoppingCards = () => {
  const dispatch = useAppDispatch();
  const { shoppingList } = useAppSelector(
    (state) => state.shopping
  );
  const { usersList } = useAppSelector(
    (state) => state.admin
  )
  const { shoppingDate } = useAppSelector(
    (state) => state.shopping
  )
  const username = useAppSelector((state) => state.user.username)

  useEffect(() => {
    dispatch(getAllShoppingByUser(String(username)));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(getUserByUsername(String(username)));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(getDateShopping(String(username)));
  }, [dispatch, username]);

  const shopsByUser = usersList.map(e => e.shopping).flat()
  const total = shopsByUser.map(e => {
    return shoppingList.filter(a => a.idShop === e.toString())
   })
  console.log(total)
  return (
    <div className="w-full">
      <Header/>
    <div className="flex w-full justify-center">
      <div>
      {
          total.length ? (
            total.map((producto, index) => 
              <div key={index} className = "my-3 w-[55rem] border border--slate-500 rounded-xl shadow-lg">
                <div className = "flex justify-between bg-slate-200 h-20 rounded-t-xl">
                <div className = "flex w-2/3 bg-slate-400 rounded-tl-xl">
                  <div className="px-20 pt-4"> FECHA DE PEDIDO: <p>{shoppingDate.map(e => e.id === producto[0]?.idShop 
                  ? e.createdAt.substring(0,10)
                  : "" )}</p>
                </div>
                <div className="pl-10 pt-4 "> TOTAL DE COMPRA: <p>ARS {producto.reduce((acc, obj) => { return acc + obj.total_Price}, 0)}</p>
                </div></div>
                <div className="px-10 pt-4 bg-yellow rounded-tr-xl" > PEDIDO N° <p> {producto[0]?.idShop}</p></div>


                </div>
                {
                producto.map((el) => 
                <div> <CardShop  products={el} />
                </div>)
              }</div>
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