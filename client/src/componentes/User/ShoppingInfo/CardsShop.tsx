import React, { useEffect } from "react";
import CardShop from "./CardShop"
import { getAllShoppingByUser, getDateShopping } from "../../../redux/slices/ShoppingSlice/shoppingActions";
import { getUserByUsername } from "../../../redux/slices/AdminSlice/adminActions";
import { setUserData } from "../../../redux/slices/UserSlice/UserActions";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";

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

   console.log(shoppingList);
   
       
  return (
    <div className="flex w-full bg-white">
      <div>
      {
          total.length ? (
            total.map((producto, index) => 
              <div key={index} className = "mx-10 my-3   w-[76rem] border border-black rounded-xl">
                <div className = "bg-slate-200 h-20 rounded-t-xl">
                <div> Pedido realizado
                </div>
                <div> Total: {producto.reduce((acc, obj) => { return acc + obj.total_Price}, 0)}
                </div>


                </div>
                {
                producto.map((el) => 
                <div> <CardShop  products={el} />
                </div>)
              }</div>
            )
          
        ) : (
            <div>
              <p>No se encontraron productos</p>
            </div>
          )}
      </div>
    </div>
  );
};
//<p>{shoppingList[0].products[0].name}</p>
export default ShoppingCards;