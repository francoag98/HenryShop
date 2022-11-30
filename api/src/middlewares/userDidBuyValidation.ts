import { Request, Response } from "express";
import { User } from "../models/User";
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";
const { request } = require("http");
const jwt = require("jsonwebtoken");
import { getUserById, getDateShop } from '../controllers/user'
import { Shopping } from "../models/Shopping";

import {GoogleUserDocument} from '../models/googleUser';
import {GithubUserDocument} from '../models/githubUser'
import {UserDocument} from '../models/User'

module.exports = async (req: any, res: any, next: any) => {
  const { productId } = req.body;
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid admin" });
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    let origin = '';
    if (decodedToken) {
      var userDefault = await User.findById(decodedToken.id );
      origin = 'default';
    }
    else if(!userDefault){
      var googleUser = await GoogleUser.findOne({ email: decodedToken.email });
      origin = "google";
    }
    else if(!googleUser){
      var githubUser = await GithubUser.findOne({ username: decodedToken.username });
      origin = "github";
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid admin" });
    }
    let shop: any;
    if (origin === "default") shop = await getDateShop(userDefault.username as string, origin);
    if (origin === "google") shop = await getDateShop(googleUser?.email as string, origin);
    if (origin== "github") shop = await getDateShop(githubUser?.username as string, origin)
    let buyed = false;
    shop.forEach((sh:any) => {
      sh.products.forEach((pr: any) => {
        if (pr.id === productId) {
          buyed = true;
        }
      })
    })
    console.log('buyed ', buyed)
    if (!buyed)
      return res.status(500).send({ message: 'Debe comprar este producto antes de poder dejar una reseña' })
    next();
  }
}