import React from 'react'
import OverLay from '../../../../Components/Modals/OverLay'
import RolePermissions from './Permissions/RolePermissions'
import { useTranslation } from 'react-i18next'
interface Props{
    open: boolean,
    handleOpen: ()=>void
    roleId: string
}
const RolePermissionsOverlay = ({open, handleOpen, roleId}:Props) => {
const {t} = useTranslation()
  return (
    <OverLay
        open={open}
        handleOpen={handleOpen}
        title={t("Edit Permissions")}
    >
        <RolePermissions 
            roleId={roleId} 
        />
    </OverLay>
  )
}

export default RolePermissionsOverlay
