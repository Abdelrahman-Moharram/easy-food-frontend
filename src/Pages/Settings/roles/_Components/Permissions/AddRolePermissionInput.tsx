import React from 'react'
import { toast } from 'react-toastify'
import { useAddPermissionToRoleMutation } from '../../../../../redux/api/rolesApi'
import { CheckBox } from '../../../../../Components/Forms'
import { PermissionType } from './PermissionsTypes'

const AddRolePermissionInput = ({permission, roleId}:{permission:PermissionType, roleId:string}) => {
    const [addPermissionToRole, {isLoading}] = useAddPermissionToRoleMutation()

    const handleAddRolePermission = ({permission_id}:{permission_id:string}) =>{
        if (!isLoading)
            addPermissionToRole({id:roleId, permission_id})
                .unwrap()
                .then(res=>{

                }).catch(err=>{
                    toast.error(err.data.error)
                })
    }
  return (
    <div>
        <CheckBox 
            changeCheckBox={e=>{handleAddRolePermission({permission_id:permission.id})}}
            checked={permission.has_perm}
            label={permission.label}
            labelId={permission.key}
            name={permission.key}
            key={permission.id}
        />
    </div>
  )
}

export default AddRolePermissionInput
