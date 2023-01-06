import { Schema, model, PaginateModel, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { NamedTupleMember } from "typescript";
import { product, variant } from "../Types";
import { review as elTipo } from "../Types";

export const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Array<Number>, required: true },
  image: { type: Array, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  deleted: { type: Boolean, default: false },
  reviews: [{
    review: { type: Schema.Types.ObjectId, ref: 'Review' }
  }],
  variantName: String,
  variants: Array<variant>,
  currentPrice: {type: Number},
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

productSchema.set('toJSON', { virtuals: true })

productSchema.set('toObject', { virtuals: true })

productSchema.virtual('rating').get(function () {
  if(!this.reviews.length) return 0
  const sumRatings = this.reviews.reduce((acc, rev) => {
    console.log(rev);
    const aux = rev.review as unknown as elTipo;
    console.log(aux);
    const rat = aux.rating as number
    return acc + rat
  }, 0) as number
  return sumRatings / this.reviews.length
})

interface ProductDocument extends Document, product { }

productSchema.plugin(mongoosePaginate);

export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Products",
  productSchema,
  "products"
);

export default Product;
