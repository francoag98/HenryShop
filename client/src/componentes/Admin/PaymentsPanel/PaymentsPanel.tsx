import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllProducts } from "../../../redux/slices/ProductSlice/productActions";
import { URL_BACK_DEV } from "../../../redux/slices/ProductSlice/productActions";
import { AiFillEye} from "react-icons/ai";
import { getAllPayments } from "../../../redux/slices/AdminSlice/adminActions";
import SearchBarPayment from "./SearchBarPayment";
import Filters from "../../Filters";
const PaymentsPanel = () => {
  let navigate = useNavigate();

  const Payments = useAppSelector((state) => state.admin.payments);
  const filters: Object = useAppSelector((state) => state.admin.filtersPayment );
  const paymentPages = useAppSelector((state) => state.admin.paymentsPages);
  const [currentPage, setCurrentPage] = useState(1);
  let id = 1;
  
  let array: Array<number> = [];
  for (let i = 1; i <= paymentPages; i++) {
    array.push(i);
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPayments(currentPage, filters));
  }, [currentPage]);
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    var value = event.target.value;
    var x = value;
    var y: number = +x;
    setCurrentPage(y);
  };
  return (
    <div className="flex justify-center items-center xl:w-10/12">
      <div className=" mt-8 mb-8 flex flex-col justify-center xl:w-10/12 shadow">
        <SearchBarPayment/>
        <table className="shadow-2xl ">
          <tr className="w-12 border border-slate-300 bg-gray-200  rounded-xl ">
            <th className="p-2">
             <></>
            </th>
            <th></th>
            
            <th>
              Page:
              <select
                className="bg-gray-200 hover:bg-gray-400 rounded"
                onChange={(e) => handleOnChange(e)}
              >
                {paymentPages &&
                  array.map((pagina: number) => (
                    <option value={pagina}> {pagina}</option>
                  ))}
              </select>
            </th>
          </tr>
          <tr className="border border-black bg-slate-900	text-white rounded-xl ">
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              ID Compra
            </th>
            <th className="border border-black font-normal p-2">N° Compras</th>
            <th className="border border-black font-normal p-2 pl-4 pr-4">
              Actions
            </th>
          </tr>
          {Payments &&
            Payments.map((payment) => (
              <tr className="border border-slate-300">
                <td
                  className="pl-2 pr-2 bg-gray-300 text-xs xl:text-base border-black"
                >
                  {payment.id}
                </td>
                <td
                  className="pl-2 max-w-1/3 bg-gray-300  border-black"
                >
                  {<p className="text-xs font-bold">{(payment.products.map((e) => e.name)).length}</p>}
                </td>{" "}
                <td
                  className="flex items-center justify-center bg-gray-300 p-2 border-black"
                >
                  <button
                    value={payment.id}
                    onClick={()=> navigate(`/admin/payments/${payment.id}`)}
                    className="w-12 h-12 p-3 bg-green-500 hover:bg-green-700 text-white font-bold  border border-green-700 rounded hover:duration-500 duration-300"
                  >
                    <AiFillEye className="w-6 h-6" />
                  </button>
                  {/* <button
                    value={payment.id}
                    className="w-12 h-12 p-3 bg-amber-500 hover:bg-amber-700 text-white font-bold  border border-amber-700 rounded hover:duration-500 duration-300"
                  >
                    <BiEdit className="w-6 h-6" />
                  </button> */}
                </td>
              </tr>
                
              
            ))}
        </table>
      </div>
    </div>
  );
};

export default PaymentsPanel;
