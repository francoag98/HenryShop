import { useEffect, useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactNode } from "react";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";

const Pagination = () => {
  const toArray = (num: Number) => {
    let array = [];
    for (let i = 1; i <= num; i++) {
      array.push(i);
    }
    return array;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { productPages } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.filterState.filters);

  const dispatch = useAppDispatch();

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  const previous = () => {
    if (currentPage > 1) {
      dispatch(getAllProducts(currentPage - 1, filters));
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage);
    }
  };

  const next = () => {
    if (currentPage < productPages) {
      dispatch(getAllProducts(currentPage + 1, filters));
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage);
    }
  };

  return (
    <div className="max-w-4/5 rounded-lg shadow-xl h-16 flex flex-row items-center justify-center select-none font-bold gap-2 pl-4 pr-4">
      <div
        onClick={previous}
        className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-gray-400 hover:bg-gray-300 hover:duration-300 duration-300 cursor-pointer pl-2"
      >
        <MdArrowBackIos className="w-6 h-6" />
      </div>

      {productPages &&
        toArray(productPages).map((page): Array<ReactNode> | any => {
          return (
            <div
              key={page}
              onClick={() => {
                setCurrentPage(page);
                dispatch(getAllProducts(page, filters));
              }}
              className={
                currentPage === page
                  ? "w-12 h-12 bg-yellow flex flex-col justify-center rounded-lg"
                  : "w-12 h-12 flex flex-col items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-300 hover:duration-300 duration-300 cursor-pointer"
              }
            >
              {page}
            </div>
          );
        })}

      <div
        onClick={next}
        className="w-12 h-12 flex flex-col items-center justify-center rounded-lg text-gray-400 hover:bg-gray-300 hover:duration-300 duration-300 cursor-pointer"
      >
        <MdArrowForwardIos className="w-6 h-6" />
      </div>
    </div>
  );
};
// seleccionado: w-12 h-12 bg-yellow flex flex-col justify-center rounded-lg
export default Pagination;
