import { user } from "../../Types";
import { User } from "../../models/User";
import { GoogleUser } from "../../models/googleUser";
import { Shopping } from "../../models/Shopping";
import { getShop } from "../ShopCart";
import e from "express";
const jwt = require("jsonwebtoken");

export const addNewUser = async (user: user) => {
  if (
    !user.name ||
    !user.email ||
    !user.username ||
    !user.password ||
    !user.birthday
  ) {
    throw new Error("Flata enviar datos");
  }
  const userFind = await User.findOne({ name: user.username });
  if (!userFind) {
    let newUser = await User.create({ ...user });
    return newUser;
  } else {
    throw new Error("Username ingresado ya existe");
  }
};

const pageSize = 10;


export const getAllUser = async (page: number ) => {

    const resultUsers = await User.paginate( { page: page })
  return resultUsers;
};

export const getUser = async (username: string) => {
  let resultUser = null;
  resultUser = await User.findOne({ username: username }).exec();
  return resultUser;
};

export const getUserShop = async (username: string) => {
  const user = await User.findOne({username: username});
  const ids = user.shopping.map((id) => id.toString())
  const shop = await Promise.all(ids.map(async el =>  {
    
      const result = await getShop(el)
      
      const newResult = result.products.map((e) => [{...e, idShop: result._id}] )
      
      return newResult
     
  }))
  /*const shopF = await Promise.all(shop.map(async el => {
    return (
      await el.products
    )
  })) */

  
   const shopF = shop.flat(2) 
    
  
  return shopF

  /*var shop = []
  if(ids[0]){ 
  for (let i=0; i<ids.length; i++){
    shop[i] = await getShop(ids[i])
    
   }
   console.log(shop)
   return shop
   
  } else {
    throw new Error("No hay ventas");
  }*/
}

export const updateEmail = async (id: string) => {
  const result = await User.findOneAndUpdate({ _id: id }, { confirmed: true });
  if (!result) {
    throw new Error("No se puede cambiar la propiedad confirmed");
  }
  return result;
};

export const compareUsernames = async (username: string, token: string) => {
  const decodedToken = jwt.verify(token, process.env.SECRETKEY);

  if (username !== decodedToken.username) throw new Error("No autorizado");
};

interface IUserChanges {
  username: string;
  name: string;
  email: string;
  birthday: string;
}

interface putBody {
  username: string;
  name: string;
  email: string;
  birthday: Date;
}
export const updateUser = async (body: putBody, id: number) => {
  // const { username, name, email, birthday} = body;

  await User.findOneAndUpdate({ _id: id }, body);

  const findIdUser = await User.findById({ _id: id });

  const userName = findIdUser?.username;
  const userId = findIdUser?.id.toString();
  const userForToken = { userId, userName };

  const token = jwt.sign(userForToken, process.env.SECRETKEY);
  const decodedToken = jwt.verify(token, process.env.SECRETKEY);
  const usernameToken = decodedToken.username;
  const tokenJson = {
    username: usernameToken,
    token: token,
  };
  // nombre manzana // usuario es pera

  return tokenJson;
};
export const putSwitchUserDelete = async (id: string) => {
  const result = await User.findOneAndUpdate({ _id: id}, { deleted: false })
  return result
}
export const deleteUserByID = async (id: string) => {
  const findIdUser = await User.findOneAndUpdate({ _id: id}, {deleted: true})
  return findIdUser
}