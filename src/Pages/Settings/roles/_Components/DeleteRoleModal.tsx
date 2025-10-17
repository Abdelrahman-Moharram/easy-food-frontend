
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { SelectInput } from '../../../../Components/Forms'
import Button from '../../../../Components/Common/Button'
import { baseType } from '../../../../Components/Types/Others'
import { useDeleteRoleMutation, useGetRolesAsSelectListQuery, useRoleDetailsMutation } from '../../../../redux/api/rolesApi'
import { Modal } from '../../../../Components/Modals'
import { useTranslation } from "react-i18next";

interface Props{
    handleToggler:()=>void,
    open:boolean,
    roleId:string
}
const DeleteRoleModal = ({open, handleToggler, roleId}:Props) => {

    const {t} = useTranslation();
    const baseForm = {
      'alter_role':''
    }
    const [form, setForm] = useState(baseForm)
    const {data} = useGetRolesAsSelectListQuery({exclude:roleId})
    const [getRoleFormData, {data:role_data}] = useRoleDetailsMutation()
    const [deleteRole, {isLoading}] = useDeleteRoleMutation()

    const selectChange = (e: ChangeEvent<HTMLSelectElement>)=>{
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
    useEffect(()=>{       
      if(roleId)
        getRoleFormData({id:roleId})  
      setForm(baseForm)      
  }, [roleId, open])

  const submitDeleteRole = () =>{
    
    if(roleId){
      deleteRole({roleId, alter_role: form.alter_role})
        .then(res=>{
          handleToggler()
          toast.success(res?.data?.message)
        })
        .catch(err=>{
          toast.error(err?.data?.message || t("Something went wrong please try again later"))
        })
    }
  }
  
  return (
    <Modal
      open={open}
      handleToggler={handleToggler}
    >
      <div className="space-y-5">
        <div className='text-red-500 text-lg font-semibold'>{t("Are you sure u want to delete")} <span className='font-semibold'>"{role_data?.role?.name}"</span></div>
        <p className=''>{t("You should choose an alter role to move current role users to")}</p>

        <div className="w-full">
          <SelectInput
            labelId='alter_role'
            label={t("Alter Role")}
            onChange={selectChange}
            value={form?.alter_role}
            emptyoption
            options={data?.roles?.map((i:baseType)=>({label:i.name, value:i.id}))}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button variant='red' title={t("Delete")} onClick={submitDeleteRole} icon={<FaTrash />} isLoading={isLoading} />
            <Button 
              className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
              onClick={handleToggler}
              isLoading={false}
              title={t("Cancle")}
              variant='secondary'
            />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteRoleModal
