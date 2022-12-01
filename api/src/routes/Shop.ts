import { Router, Request, Response } from "express";
import { addNewShop, getAllShopAdmin, getShop } from "../controllers/ShopCart";
import { Product } from "../models/Product";
import { Shopping } from "../models/Shopping";
import User from "../models/User";
const jwt = require("jsonwebtoken");
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";


require("../mongo")
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { products } = req.body;

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

  const product = await Product.find({ _id: products })
  try {
    if (user && product) {
      const newRela = await addNewShop(user.id, product);
      res.status(200).send(newRela);
    }
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
})

router.get("/adminusers", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const id: string = String(req.query.id);
    
    let result;
    let y: number;
    page ? (y = +page) : (y = 1);
    result = await getAllShopAdmin(y, id);
     result !== null
      ? res.status(200).json(result)
      : res.status(404).json({ error_message: "Ninguna compra encontrada" });
  } catch (error) {
    res.status(400).send(error)
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getShop(id);
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({
        error_message: "No se ha encontrado compra",
      });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
