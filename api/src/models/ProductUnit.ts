import { Schema, model, PaginateModel, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { productUnit } from "../Types";

const productUnitSchema = new Schema({
 
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
productUnitSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface ProdutcUnitDocument extends Document, productUnit {}

productUnitSchema.plugin(mongoosePaginate);

export const ProdutcUnit = model<ProdutcUnitDocument, PaginateModel<ProdutcUnitDocument>>(
  "ProdutcUnits",
  productUnitSchema,
  "productUnits"
);
