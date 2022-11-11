import {Schema, model, PaginateModel, Document} from 'mongoose';
import { user } from '../Types';
import mongoosePaginate from "mongoose-paginate-v2"

const userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	birthday: {type: String, required: true},
	deleted: {type: Boolean, default: false},
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface UserDocument extends Document, user {}

userSchema.plugin(mongoosePaginate);

export const User = model<
  UserDocument,
  PaginateModel<UserDocument>
>('Users', userSchema, 'users');