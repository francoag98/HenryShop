import { Router, Request, Response, response } from "express";
import {
  getAllProductsAdmin,
  addNewProduct,
  getProductById,
  deleteProduct,
  changeProperties,
  getWithfilters,
  findByName,
  activateProduct,
} from "../controllers/product/index";
import { Product } from "../models/Product";
import User from "../models/User";
const jwt = require("jsonwebtoken");
const userValidation = require("../middlewares/userValidation");
require("../mongo");
const { mercadopago } = require("../utils/mercadoPago");
const adminValidation = require("../middlewares/adminValidation");
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";

const routes = Router();

const CLIENT_URL = process.env.CLIENT_URL;

//TODOS LOS GET

routes.get("/admin", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const name: string = String(req.query.name);
    const category: string = String(req.query.category);
    const order: string = String(req.query.order);
    const property: string = String(req.query.property);
    page === 0 ? page + 1 : page;
    const result: any = await getAllProductsAdmin(
      page,
      category,
      name,
      property,
      order
    );
    if (result) res.status(200).json(result);
    else res.status(400).json({ error_message: "not found" });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

routes.get("/", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const name: string = String(req.query.name);
    const category: string = String(req.query.category);
    const order: string = String(req.query.order);
    const property: string = String(req.query.property);
    const result: any = await getWithfilters(
      page,
      category,
      name,
      property,
      order
    );
    if (result) res.status(200).json(result);
    else res.status(400).json({ error_message: "not found" });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

routes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getProductById(id);
    if (!result) {
      res
        .status(404)
        .json({ error_message: "No se encontro el producto con ese id" });
    } else {
      await result.populate("reviews");
      res.status(200).send(result);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error_message: error.message });
  }
});

//TODOS LOS POSTS
routes.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct = req.body;
    if (!newProduct) {
      res.status(400).send({ error: "Info Missing" });
    }
    await addNewProduct(newProduct);
    res.status(200).send(newProduct);
  } catch (error: any) {
    res.status(500).send({ error_message: error.message });
  }
});

routes.post("/payment", userValidation, async (req: Request, res: Response) => {
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
        let copia: any = { ...p };
        arr.push({ ...copia._doc, quantity: el.quantity });
      }
      return arr;
    };

    const productos = await productAndQuantity(productosForFind);
    if (productos && user) {
      let preference = {
        items: productos.map((el: any) => {
          return {
            id: el._id,
            title: el.name,
            currency_id: "ARS",
            picture_url: el.image,
            description: el.description,
            category_id: "art",
            quantity: el.quantity,
            unit_price: el.price.at(-1),
          };
        }),
        back_urls: {
          success: `${CLIENT_URL}/success`,
          failure: `${CLIENT_URL}/failure`,
          pending: `${CLIENT_URL}/failure`,
        },
        auto_return: "approved",
        binary_mode: true,
      };
      mercadopago.preferences
        .create(preference)
        .then((response: any) => {
          res.json({ response });
        })
        .catch((error: any) => {
        });
    }
  } catch (error) {
    res.status(401).send({ error });
  }
});

//DELETE
routes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const del = await deleteProduct(id);
    console.log(del);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
});
routes.put("/activate/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const del = await activateProduct(id);
    console.log(del);
    res.status(200).json({ message: "Producto activado" });
  } catch (error) {
    console.log(error);
  }
});
//PUT
routes.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await changeProperties(id, body);
    res.status(200).json({ message: "Parámetros cambiados correctamente" });
  } catch (error) {
    console.log(error);
  }
});

export default routes;
