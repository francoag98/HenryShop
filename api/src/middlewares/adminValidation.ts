import { Request, Response } from "express";
import { User } from "../models/User";
const { request } = require("http");
const jwt = require("jsonwebtoken");

module.exports = async (req: any, res: any, next: any) => {
  console.log("Admin middleware");
  const authorization = req.get("authorization");
  let token = null;

  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }

  const decodedToken = jwt.verify(token, process.env.SECRETKEY);
  console.log(decodedToken);

  let user = null;
  if (decodedToken) {
    user = await User.findOne({ _id: decodedToken.id });
  }
  console.log(user);
  if (!token || !decodedToken.id || !user?.isAdmin) {
    return res.status(401).json({ error: "token missing or invalid admin" });
  }
  const { id } = decodedToken;
  req.id = id;
  next();
};
