import { Product } from "../../models/Product";
import { product } from "../../Types";

export const bestRating = async () => {
  const result = await Product.find({ rating: 5, deleted: false });
  const filter = result.map((e) => {
    return {
      name: e.name,
      image: e.image,
      rating: e.rating,
      id: e.id,
    };
  });

  return filter;
};

export const bestOffers = async () => {
  const call = await Product.find();
  const filtered = call.filter((el: any) => el.price.length > 1);
  const filtered2 = filtered.filter(
    (el: any) =>
      el.price[el.price.length - 1] < el.price[el.price.length - 2]
      && el.deleted === false
  );
  let result = filtered2
    .map((el: any) => {
      return {
        product: el,
        discount: Math.floor(
          100 -
            (el.price[el.price.length - 1] * 100) /
              el.price[el.price.length - 2]
        ),
      };
    })
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);
  //.map((el) => el.el);
  return result;
};
