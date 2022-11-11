import { Router, Request, Response } from "express";
import {
  getAllProductsAdmin,
  addNewProduct,
  getProductById,
  deleteProduct,
  changeProperties,
  getWithfilters,
} from "../controllers/product/index";
require("../mongo");

const routes = Router();

//TODOS LOS GET


routes.get("/admin", async (_req: Request, res: Response) => {
  try {
    const result = await getAllProductsAdmin();
    res.status(200).send(result);
    
  } catch (error) {
    console.log(error);
  }
});

routes.get('/', async (req: Request, res:Response) => {
  try{
    const page:number = Number(req.query.page);
    const name:string = String(req.query.name);
    const category:string = String(req.query.category);
    const order:string = String(req.query.order);
    const property:string = String(req.query.property);
    const result:any = await getWithfilters(page, category, name, property, order);
    if(result)res.status(200).json(result);
    else res.status(400).json({error_message: "not found"});
  }catch(error:any){
    res.status(500).json({error_message:error.message});
  }
});

routes.get("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const result = await getProductById(id);
    console.log(id);
    if(!result){
      res.status(200).json({error_message: "No se encontro el producto con ese id"})
    }
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).json({error_message:error.message});
  }
  
});
//TODOS LOS POSTS
routes.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    if (!newProduct) {
      res.status(400).send({ error: "Info Missing" });
    } else {
      await addNewProduct(newProduct);
      res.status(200).send(newProduct);
    }
  } catch (error: any) {
    res.status(500).send({error_message: error.message});
  }
});

//DELETE
routes.delete("/:id", async (req: Request, res: Response) =>{
  try {
    const {id} = req.params;
    const del = await deleteProduct(id);
    console.log(del)
    res.status(200).json({message : 'Producto eliminado'});
  } catch (error) {
    console.log(error)
  }
})

//PUT

routes.put("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const put = await changeProperties(id, body)
    console.log(put)
    res.status(200).json({message : 'Parámetros cambiados correctamente'})
  } catch (error) {
    console.log(error)
  }
})



export default routes;
