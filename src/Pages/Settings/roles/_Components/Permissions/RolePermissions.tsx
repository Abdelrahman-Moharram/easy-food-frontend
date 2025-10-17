import React from 'react'
import Modules from './Modules'
import { useRolePermissionsDetailsQuery } from '../../../../../redux/api/rolesApi'

const RolePermissions = ({roleId}:{roleId:string}) => {
  const {isLoading, data} = useRolePermissionsDetailsQuery({id:roleId},{ skip : !roleId})
  
  
  return (
    <div className='p-12'>
      <h3 className='font-extrabold text-4xl'>{data?.role.name}</h3>
      <div className=''>
        {
          !isLoading && data?.permissions?
            Object?.keys(data?.permissions).map((key)=>(
              <Modules 
                permissions={data?.permissions[key]}
                name={key}
                key={key}
                roleId={roleId}
              />
            ))
          :null
        }
      </div>
    </div>
  )
}

export default RolePermissions
