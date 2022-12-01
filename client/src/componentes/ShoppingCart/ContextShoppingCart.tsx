/* eslint-disable @typescript-eslint/no-redeclare */
//import { current } from "@reduxjs/toolkit";
import { createContext, ReactNode, useState, useContext } from "react";
//import { useAppSelector } from "../../hooks";
import { ShoppingCart } from "./ShoppingCart";
import { useLocalStorage } from "./useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
    variante: string
}

type ShoppingCartContex = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string, variante: string) => void
    decreaseCartQuantity: (id: string, variante: string) => void
    removeFromCart: (id: string, variante: string) => void
    addToCart: (id: string, quantity: number,  variante: string) => void
    cartQuantity: number
    cartItems: CartItem[]
    setEmptyCart: () => void
}

const ShoppingCartContex = createContext({} as ShoppingCartContex)

export function useShoppingCart(){
    return useContext(ShoppingCartContex)
}
export function ShoppingCartProvider({ children }:
ShoppingCartProviderProps){
    const [isOpen, setIsOPen] = useState(false)
    //***reiniciar carrito***
    //const [cartItems, setCartItems] = useState<CartItem[]>([])
    //**LocalStorage**
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("Shoping-cart",[])

    const setEmptyCart = () => {
        setCartItems([])
    }
    
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

        const openCart = () => setIsOPen(true)
        const closeCart = () => setIsOPen(false)

    function getItemQuantity(id: string){
        return cartItems.find(item => item.id === id)?.quantity || 1
    }


    function increaseCartQuantity(id: string, variante: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id && item.variante === variante)){
                return currItems.map(item=>{
                    if(item.id === id && item.variante === variante){
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            } else {
                return [...currItems]
            }
        })
    }
        function decreaseCartQuantity(id: string, variante: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id && item.variante === variante)?.quantity === 1){
                return currItems
            }else{
                return currItems.map(item=>{
                    if(item.id === id){
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function addToCart(id: string, quantity: number, variante: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id && item.variante === variante)){
                return currItems.map(item=>{
                    if(item.id === id && item.variante === variante){
                        return { ...item, quantity: item.quantity + quantity}
                    } else {
                        return item
                    }
                })
            } else{
                return [...currItems, { id, quantity, variante }]
            }})
    }

    

    function removeFromCart(id: string, variante: string){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id && item.variante === variante)){
                return currItems.filter(item => !(item.id === id && item.variante === variante))
            } else {
                return [...currItems]
            }
            })
    }

    return (
        <ShoppingCartContex.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, addToCart, setEmptyCart ,cartItems, cartQuantity}}>
            {children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContex.Provider>
    )
}