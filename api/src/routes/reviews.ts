import { Router, Request, Response, response } from "express";
import User from "../models/User";
import GoogleUser from "../models/googleUser";
import GithubUser from "../models/githubUser";
import Product from "../models/Product";
import Review from "../models/Review";
import { addNewReview } from "../controllers/review";
const userValidation = require("../middlewares/userValidation");
require("../mongo");

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { text, rating, userId, productId} = req.body;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    const review = await addNewReview(text, rating, user._id, product._id); 

    await User.findByIdAndUpdate(user._id, { reviews: [...user.reviews, { info: review.id }] })
    await Product.findByIdAndUpdate(product._id, { reviews: [...user.reviews, { info: review.id }] })

    res.status(200).send(review)
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ message: e.message })
  }
});

// get a specific review
router.get('/getreview/:reviewId', async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  try {
    const review = await Product.findById(reviewId);
    console.log(review)
    review.populate('user');
    review.populate('product');
    res.status(200).send('Review ')
  } catch (e: any) {
    res.status(500).send({ message: e.message })
  }
})

// get reviews of one product
router.get('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    console.log(product)
    res.status(200).send('Operación concluida')
  } catch (e: any) {
    res.status(500).send({ message: e.message })
  }
})

export default router;