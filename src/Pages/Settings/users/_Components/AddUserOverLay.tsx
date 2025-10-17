import React from 'react'
import UserForm from './UserForm'
import OverLay from '../../../../Components/Modals/OverLay'
import { useTranslation } from "react-i18next";

interface Props{
    handleOpen: ()=>void,
    open: boolean,
    userId?:string
}
const UserFormOverLay = ({handleOpen, open, userId}:Props) => {
const {t} = useTranslation();
  return (
    <OverLay
        handleOpen={handleOpen}
        open={open}
        title={userId? t("Edit User") : t("Add User")}
    >
      <UserForm 
        action={handleOpen}
        open={open}
        userId={userId}
      />
    </OverLay>
  )
}

export default UserFormOverLay
