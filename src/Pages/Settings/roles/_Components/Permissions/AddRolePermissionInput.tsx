import { useAddPermissionToRoleMutation } from '../../../../../redux/api/rolesApi'
import { CheckBox } from '../../../../../Components/ui/Forms'
import { PermissionType } from './PermissionsTypes'

const AddRolePermissionInput = ({permission, roleId}:{permission:PermissionType, roleId:string}) => {
    const [addPermissionToRole, {isLoading}] = useAddPermissionToRoleMutation()

    const handleAddRolePermission = ({permission_id}:{permission_id:string}) =>{
        if (!isLoading)
            addPermissionToRole({id:roleId, permission_id})
    }
  return (
    <div>
        <CheckBox 
            changeCheckBox={()=>{handleAddRolePermission({permission_id:permission.id})}}
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
