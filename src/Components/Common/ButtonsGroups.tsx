import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

interface Props{
    addAction?:(item)=>void
    editAction?:(item)=>void, 
    deleteAction?:(item)=>void,
    item
}


export const AddEditDeleteButtons = ({addAction, editAction, deleteAction, item}:Props) => {
  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        {
            addAction?
                <button
                    onClick={()=>addAction(item)}
                    className="inline-block border-e p-3 text-blue-600 hover:bg-gray-50 focus:relative"
                    title="Edit"
                >
                    <BsEye />
                </button>
            :null
        }
        {
            editAction?
                <button
                    onClick={()=>editAction(item)}
                    className="inline-block border-e p-3 text-green-600 hover:bg-gray-50 focus:relative"
                    title="Edit"
                >
                    <BiEdit />
                </button>
            :null
        }
        {
            deleteAction?
                <button
                    onClick={()=>deleteAction(item)}
                    className="inline-block p-3 text-red-600 hover:bg-red-100 focus:relative"
                    title="Delete"
                >
                    <FaTrash />
                </button>
            :null
        }
    </span>
  )
}