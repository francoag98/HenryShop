export interface variant {
  quantity: Number;
  value: String;
}

export interface review {
  text: String;
  rating: Number;
  user: object;
  product: object;
}

export interface refund {
  buyer_name: String;
  product_name: String;
  reason: String;
  customer_email: String;
  quantity: Number;
  purchase_id: String;
}

export interface product {
  name: String;
  rating: Number;
  description: String;
  price: Array<Number>;
  image: string[];
  stock: Number;
  category: object;
  variants: Array<variant>;
  variantName: String;
  reviews: Array<review>;
}

export interface user {
  name: String;
  email: String;
  confirmed: Boolean;
  username: String;
  password: String;
  birthday: Date;
  isAdmin: Boolean;
  reviews: Array<object>;
  shopping: Array<object>;
  deleted: Boolean;
}

export interface shopping {
  userId: string;
  products: Array<object>;
}

export interface googleUser {
  name: String;
  email: String;
  googleId: String;
  birthday: Date | null;
  isAdmin: Boolean;
  confirmed: Boolean;
  shopping: Array<object>;
  deleted: Boolean;
}

export interface githubUser {
  username: String;
  githubId: String;
  birthday: Date | null;
  isAdmin: Boolean;
  confirmed: Boolean;
  shopping: Array<object>;
  deleted: Boolean;
}

export interface category {
  name: String;
}
