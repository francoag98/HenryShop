import React, { useEffect, useState } from "react";
import axiosGetCall from "../../funciones/axiosGetCall";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IReview } from "../../redux/slices/ProductSlice";
import { getAllShoppingByUser } from "../../redux/slices/ShoppingSlice/shoppingActions";
import RatingStars from "./RatingStars";
import CheckUserReview from "./ReviewForm/CheckUserReview";
import FormReview from "./ReviewForm/FormReview";

interface ReviewProps {
  reviews: Array<IReview>;
}

const ReviewList = ({ reviews }: ReviewProps) => {
  const { username } = useAppSelector((state) => state.user);
  const { id } = useAppSelector((state) => state.products.productDetail);
  const { shoppingList } = useAppSelector((state) => state.shopping);
  const dispatch = useAppDispatch();
  const session =JSON.parse(window.localStorage.getItem("userSession") as string);
  useEffect(() => {
    if(session !== null){
      if(session.origin === "default") dispatch(getAllShoppingByUser(session.username, session.origin));
      if(session.origin === "google") dispatch(getAllShoppingByUser(session.email, session.origin));
      if(session.origin === "github") dispatch(getAllShoppingByUser(session.username, session.origin));
    }
  }, [dispatch, username]);

  let reviewed = false;
  let buyed = false;
  // ordena las reviews
  if (username) {
    const userReview = reviews.filter(({ review }) => {
      if (review.user.username === username) {
        reviewed = true;
        return true;
      }
      return false;
    })[0];
    if (reviewed) {
      let sortArr = [...reviews];
      const index = sortArr.indexOf(userReview);
      sortArr.splice(index, 1);
      sortArr.unshift(userReview);
      reviews = sortArr;
    }
  }

  shoppingList.forEach((pr) => {
    if (pr.id === id) buyed = true;
  });

  if (!reviews.length)
    return (
      <div className="mb-8 w-full lg:w-8/12">
        <h3 className="mb-8">Aún no hay reseñas</h3>
        <CheckUserReview reviewed={reviewed} buyed={buyed} />
      </div>
    );

  return (
    <div className="mb-8 w-full lg:w-8/12">
      <h3>Reseñas</h3>
      <hr />
      {reviews.map(({ review }, index) => {
        const editPermit = review.user.username === username;
        return (
          <ReviewCard
            text={review.text}
            rating={review.rating}
            user={review.user.username}
            flag={index % 2 === 0}
            key={review.id}
            editPermit={editPermit}
            reviewId={review.id}
          />
        );
      })}
      <CheckUserReview reviewed={reviewed} buyed={buyed} />
    </div>
  );
};

export default ReviewList;

interface ReviewCardProps {
  text: string;
  user: string;
  rating: number;
  flag: boolean;
  editPermit: boolean;
  reviewId: string;
}

const ReviewCard = ({
  text,
  user,
  rating,
  flag,
  editPermit,
  reviewId,
}: ReviewCardProps) => {
  const bgColor = "bg-white";
  const [editReview, setEditReview] = useState(false);

  if (editReview)
    return (
      <div>
        <FormReview
          text={text}
          rating={rating}
          putRute={true}
          reviewId={reviewId}
        />

        <button
          onClick={() => setEditReview(false)}
          className="bg-gray-400 duration-300 hover:bg-gray-200 hover:duration-300 p-2 mt-4 font-bold rounded-sm pl-4 pr-4 border-b-2 border-black"
        >
          Cancelar
        </button>
      </div>
    );

  return (
    <div
      className={`${
        flag ? bgColor : ""
      } w-full py-6 border-t border-b border-slate-300 border-solid`}
    >
      <div className="flex justify-around mb-4">
        <p className="font-bold">{editPermit ? "Tu reseña" : user}</p>
        <RatingStars value={rating} read_only={true} />
      </div>
      <h6 className="w-11/12 m-auto text-start">{text}</h6>
      {editPermit && (
        <button
          onClick={() => setEditReview(true)}
          className="bg-yellow duration-300 hover:bg-gray-200 hover:duration-300 p-2 mt-4 font-bold rounded-sm pl-4 pr-4 border-b-2 border-black"
        >
          Editar reseña
        </button>
      )}
    </div>
  );
};
