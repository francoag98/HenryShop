import React, { useEffect, useState } from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import { getAllUsers } from "../../../redux/slices/AdminSlice/adminActions";
import { AiOutlineCheck } from "react-icons/ai";
import { BiEdit, BiX } from "react-icons/bi";

interface PropsCard {
    pageId: any,
    username: string,
    name: string,
    handleActivate(Event:React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    handleDelete(Event:React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    deleted: boolean,
    id: string
}

export const UsersCard = ({username, name, handleActivate, handleDelete, deleted, id, pageId}:PropsCard) => {
    
    const[activation, setActivation] = useState(deleted);
   
    const handleIn =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      
        handleActivate(e);
        activation?setActivation(false): setActivation(true);
        
    };

    const handleOut =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleDelete(e);
        activation?setActivation(false): setActivation(true);
        
    };

    return (
        <>
            <tr className="border border-slate-300 ">
                <td
                  className={ activation ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                  
                >
                  {<p className="text-xs font-bold">{pageId}</p>}
                </td>{" "}
                <td
                  className={ activation ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                >
                  {<p className="text-xs font-bold">{username}</p>}
                </td>{" "}
                <td
                  className={ activation ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                >
                  {<p className="text-xs font-bold">{name}</p>}
                </td>{" "}
                <td
                    className={ activation ? "bg-gray-300 border-black text-white" : "bg-gray-200 border-black"}
                > 
                 { activation ? <button
                    onClick={(e) => handleIn(e)}
                    value={id}
                    className="  margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-red-500 hover:bg-red-700 text-white font-bold  border border-red-700 rounded hover:duration-500 duration-300"
                  >
                    <BiX className="w-6 h-6" />
                  </button> : <button
                    onClick={(e) => handleOut(e)}
                    value={id}
                    className="margin-auto mt-2 mb-2 w-12 h-12 p-3 bg-green-500 hover:bg-green-700 text-white font-bold  border border-green-700 rounded hover:duration-500 duration-300"
                  >
                    <AiOutlineCheck className=" w-4 h-4 ml-1" />
                  </button> }
                  
                </td>
              </tr>
        </>
   )

}