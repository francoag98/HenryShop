import { AnyMxRecord } from "dns";
import { Router, Request, Response, response } from "express";
import { sanitizeFilter } from "mongoose";
import {
  collapseTextChangeRangesAcrossMultipleVersions,
  isPlusToken,
} from "typescript";
import { addNewShop, getShop } from "../controllers/ShopCart";
import {
  addNewUser,
  compareUsernames,
  deleteUserByID,
  getAllUser,
  getDateShop,
  getUser,
  getUserShop,
  putSwitchUserDelete,
  updateEmail,
  updateUser,
} from "../controllers/user/index";
import GithubUser from "../models/githubUser";
import GoogleUser from "../models/googleUser";
import Product from "../models/Product";
import { User } from "../models/User";
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
    transporter.sendMail(
      mailOptionsRegister(newUser.email, token),
      (err: any, info: any) =>
        err ? console.log(err) : console.log(info.response)
    );
    res.status(200).send({ username, token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/confirmation/:token", async (req: Request, res: Response) => {
  try {
    const { id, username } = jwt.verify(
      req.params.token,
      process.env.SECRETKEY
    );
    let result = await updateEmail(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getuser/:username", async (req: Request, res: Response) => {
  // getUser para usuarios comunes y de terceros.
  try {
    const { username } = req.params;
    const user = await getUser(username);
    if (!user) throw new Error("");
    await user.populate("reviews");
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Usuario no encontrado" });
  }
});

// ruta para re-enviar el mail
router.post(
  "/confirmationSend",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      console.log("confirmation resend");
      const { email } = req.body;
      const authorization = req.get("authorization");
      let token = null;
      if (
        authorization &&
        authorization.toLocaleLowerCase().startsWith("bearer")
      ) {
        token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
      }
      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
      }
      transporter.sendMail(
        mailOptionsRegister(email, token),
        (err: any, info: any) =>
          err ? console.log(err) : console.log(info.response)
      );
      return res.status(200).send("Ok");
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = await getUser(username);
  const newHash = password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newHash, salt);
  const unHash = await bcrypt.compare(newHash, hashedPassword);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password); // Si no hay usuario passwordCorrect = false, si no Comparamos el password de la base de datos hasheado, con el que nos viene por body
  if (!passwordCorrect || !user) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrecto." });
  }else if(user?.deleted){
    return res.status(400).json({error_message: "Cuenta deshabilitada"});
  } else {
    const userForToken = { id: user.id, username: user.username, origin: "default" };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
    return res
      .status(200)
      .send({ username: user.username, token: token, origin: "default" });
  }
});

router.get("/isAdmin", adminValidation, async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
  } catch (error: any) {
    res.status(401).send("No admin");
  }
});

router.get("/admin/allusers", async (req: Request, res: Response) => {
  const page: number = Number(req.query.page);
  const username: string = String(req.query.username);
  const order: string = String(req.query.order);
  const property: string = String(req.query.property);
  try {
    let result: any;
    let number: number = 1;
    let y: number;
    page ? (y = +page) : (y = 0);

    result = await getAllUser(y, username, order, property);

    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({ error_message: "Ningún usuario encontrado" });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.put(
  "/admin/users/:id",
  adminValidation,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await putSwitchUserDelete(id);
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
router.get("/admin/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const result = await getUser(username);
    result !== null
      ? res.status(200).json([result])
      : res.status(404).json({
          error_message: "Ningún usuario encontrado con ese username",
        });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/isUser", userValidation, async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
  } catch (error: any) {
    res.status(401).send("No admin");
  }
});

router.put("/", userValidation, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const authorization = req.get("authorization");
    let token: string | undefined = authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    const id = decodedToken.id;
    const updated = await updateUser(body, id);
    if (!updated) throw new Error("Usuario no encontrado");
    res.status(200).send(updated);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", adminValidation, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteUserByID(id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(
  "/getUserByToken",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const authorization = req.get("authorization");

      let token: string | undefined = authorization?.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      const id = decodedToken.id;
      const user = await User.findById(id);
      user
        ? res.status(200).send(user)
        : res.status(400).send("el usuario no esta confirmado");
    } catch (error: any) {
      res.status(401).send("Erorr isConfirmed");
    }
  }
);


router.post(
  "/shopping",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const productosForFind = req.body.products;
      let token = req.get("authorization");
      if (token) {
        token = token.split(" ")[1];
      }
      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      let user = null;
      if (decodedToken) {
        user = await User.findOne({ _id: decodedToken.id });
      }
      if (!user) {
        user = await GoogleUser.findOne({ email: decodedToken.email });
      }
      if (!user) {
        user = await GithubUser.findOne({ username: decodedToken.username });
      }
      const productAndQuantity = async (ArrObj: any) => {
        let arr: any = [];
        let el: any;
        for (el of ArrObj) {
          let p = await Product.findOne({ _id: el.id });

          arr.push({
            id: p.id,
            name: p.name,
            rating: p.rating,
            description: p.description,
            price: p.price.at(-1),
            total_Price: p.price[p.price.length - 1].valueOf() * el.quantity,
            image: p.image,
            category: p.category,
            quantity: el.quantity,
            color: el.color,
            variante: el.variante,
          });
        }
        return arr;
      };

      const productos = await productAndQuantity(productosForFind);
      if (user && productos) {
        const shopping = await addNewShop(user.id, productos);
        await shopping.save();
        const newShopping = [...user.shopping, shopping._id];
        let results = null;  
        if(newShopping){
          results = await User.findOneAndUpdate({_id: user.id}, {shopping: newShopping});
        }if(!results){
          results = await GoogleUser.findOneAndUpdate({_id: user.id}, {shopping: newShopping});
        }if(!results){
          results = await GithubUser.findOneAndUpdate({_id: user.id}, {shopping: newShopping});
        }
        res.status(200).send(results);
      }
    } catch (error) {
      res.status(401).send({ error });
    }
  }
);

router.get("/shopping", async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query);
    const origin = String(req.query.origin);
    const result = await getUserShop(query, origin);
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({
          error_message: "Ningún usuario encontrado con ese username",
        });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/shopdate", async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query);
    const origin = String(req.query.origin);
    const result = await getDateShop(query, origin);
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({
          error_message: "Ningún usuario encontrado con ese username",
        });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});


router.get(
  "/:username",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const user = await getUser(username);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
);

export default router;
