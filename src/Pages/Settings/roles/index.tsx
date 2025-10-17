
import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { baseType } from '../../../Components/Types/Others'
import { useSearchParams } from 'react-router-dom'
import { to_int_or_default } from '../../../Components/utils/helper'
import { useGetRolesListQuery } from '../../../redux/api/rolesApi'
import { RoleFunctionButtonGroup } from './_Components/RoleFunctionButtonGroup'
import RolePermissionsOverlay from './_Components/RolePermissionsOverlay'
import RoleFormModal from './_Components/RoleFormModal'
import { CardsListWithPagination } from '../_Components'
import DeleteRoleModal from './_Components/DeleteRoleModal'
import { IsAllowedPermissionOrNull } from '../../Guards/IsAllowedPermission'
import { useTranslation } from "react-i18next";
import Button from '../../../Components/Common/Button'


interface baseObjType{
  id: string,
  name?: string,
}

const RolesSettings = () => {
  const {t} = useTranslation();
  const [showOverLay, setShowOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [roleId, setRoleId] = useState('')
  const [currRole, setCurrRole] = useState<baseType | null>(null)
  const [searchParams] = useSearchParams();
  
    
  const size = to_int_or_default(searchParams.get("size")) 
  const page = to_int_or_default(searchParams.get("page")) 

  

  const handleEditModal = (role:baseType) =>{    
    if(role)
      setRoleId(role.id||'')
    setShowModal(!showModal)
  }
  const handlePermissionsOverLay = (role:baseType) =>{    
    if(role)
      setRoleId(role.id||'')
    setShowOverlay(!showOverLay)
  }
  const handleDelete = (role:baseType) =>{
    if(role)
      setRoleId(role.id||'')
    setDeleteModal(!showModal)
  }
  const handleModal = () =>{
    if(currRole)
      setCurrRole(null)
    setShowModal(!showModal)
  }
  const handleDeleteModal = () =>{
    if(roleId)
      setRoleId('')
    setDeleteModal(!deleteModal)
  }
  const handleOverlay = () =>{
    if(currRole)
      setCurrRole(null)
    setShowOverlay(!showOverLay)
  }
  const {data, isLoading} = useGetRolesListQuery({page, size})
  
  const options = (item:baseObjType) =>{
    return (
      <div className="flex justify-start">
        <RoleFunctionButtonGroup
          editAction={handleEditModal}
          deleteAction={handleDelete}
          permissionsAction={handlePermissionsOverLay}
          item={item}
        />
      </div>
    )
}  
  return (
    <>
      <IsAllowedPermissionOrNull
        permission='permissions.roles.delete'
      >
        <DeleteRoleModal
          roleId={roleId}
          handleToggler={handleDeleteModal}
          open={deleteModal}
        />
      </IsAllowedPermissionOrNull>

      <IsAllowedPermissionOrNull
        permission='permissions.roles.edit.permissions'
      >
        <RolePermissionsOverlay
          roleId={roleId}
          handleOpen={handleOverlay}
          open={showOverLay}
        />
      </IsAllowedPermissionOrNull>

      <IsAllowedPermissionOrNull
        permission='permissions.roles.edit'
      >
        <RoleFormModal
          handleToggler={handleModal}
          open={showModal}
          roleId={roleId}
        />
      </IsAllowedPermissionOrNull>

      <div className='px-8'>
        <div className="my-8 flex justify-end">
        
          <IsAllowedPermissionOrNull
            permission='permissions.roles.add'
          >
            <Button
              onClick={handleModal}
              title={t("Add Role")}
              variant='primary'               
              icon={<FaPlusCircle />}
            />
          </IsAllowedPermissionOrNull>
        </div>
        <CardsListWithPagination
          data={data?.data}
          isLoading={isLoading}
          page={page}
          total_pages={data?.total_pages}
          emptyMessage={t("No Roles Available")}  
          customOptions={options}
        />
      </div>
    </>
  )
}

export default RolesSettings
