import { AnyMxRecord } from "dns";
import { Router, Request, Response, response } from "express";
import { sanitizeFilter } from "mongoose";
import { isPlusToken } from "typescript";
import { addNewUser, compareUsernames, getAllUser, getUser, updateEmail } from "../controllers/user/index";
import { User } from '../models/User'
import { mailOptionsRegister, transporter } from "../transport";
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const userValidation = require("../middlewares/userValidation");
const adminValidation = require("../middlewares/adminValidation");

router.post("/", async (req: Request, res: Response) => {
  let newUser = req.body;
  try {
    let { username, _id } = await addNewUser(newUser);
    const id = _id.toString();
    const userForToken = { id, username };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
    transporter.sendMail(mailOptionsRegister(newUser.email, token), (err: any, info: any) => err ? console.log(err) : console.log(info.response));
    res.status(200).send({ username, token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error_message: error.message });
  }
});

router.get('/confirmation/:token', async (req: Request, res: Response) => {
  try {
    const { id, username } = jwt.verify(req.params.token, process.env.SECRETKEY)
    let result = await updateEmail(id)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await getUser(username);
  console.log(user)
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password); // Si no hay usuario passwordCorrect = false, si no Comparamos el password de la base de datos hasheado, con el que nos viene por body
  if (!(passwordCorrect && user)) {
    return res.status(401).json({ message: "Usuario o contraseña incorrecto." });
  }
  else {
    const userForToken = { id: user.id, username: user.username };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
    return res.status(200).send({ username: user.username, token: token });
  }
});

router.get("/:username", userValidation, async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    // comparar el username mandado con el que está en el token
    // const authorization = req.get("authorization");
    // const token = authorization?.split(" ")[1] as string;
    // compareUsernames(username, token);
    const user = getUser(username);
    res.status(200).send({ user })
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
})

router.get("/admin", async (req: Request, res: Response) => {
  try {
    const result = await getAllUser();
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({ error_message: "Ningún usuario encontrado" });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/admin/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const result = await getUser(username);
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({
        error_message: "Ningún usuario encontrado con ese username",
      });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/isAdmin", adminValidation, async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
  } catch (error: any) {
    res.status(401).send("No admin");
  }
});

router.get("/isUser", userValidation, async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
  } catch (error: any) {
    res.status(401).send("No admin");
  }
});

export default router;