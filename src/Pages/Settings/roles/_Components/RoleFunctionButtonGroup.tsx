import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash, FaUserShield } from 'react-icons/fa'
import { IsAllowedPermissionOrNull } from '../../../Guards/IsAllowedPermission'

interface Props{
    editAction:(item)=>void, 
    deleteAction:(item)=>void,
    permissionsAction:(item)=>void
    item
}
export const RoleFunctionButtonGroup = ({editAction, deleteAction, permissionsAction, item}:Props) => {
  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        <IsAllowedPermissionOrNull
            permission='permissions.roles.edit'
        >
            <button
                onClick={()=>editAction(item)}
                className="inline-block border-e p-3 text-green-600 hover:bg-gray-50 focus:relative"
                title="Edit"
            >
                <BiEdit />
            </button>
        </IsAllowedPermissionOrNull>

        <IsAllowedPermissionOrNull
            permission='permissions.roles.edit.permissions'
        >
            <button
                onClick={()=>permissionsAction(item)}
                className="inline-block border-e p-3 text-blue-600 hover:bg-gray-50 focus:relative"
                title="Edit Permissions"
            >
                <FaUserShield />
            </button>
        </IsAllowedPermissionOrNull>

        <IsAllowedPermissionOrNull
            permission='permissions.roles.delete'
        >
            <button
                onClick={()=>deleteAction(item)}
                className="inline-block p-3 text-red-600 hover:bg-red-100 focus:relative"
                title="Delete"
            >
                <FaTrash />
            </button>
        </IsAllowedPermissionOrNull>
    </span>
  )
}
