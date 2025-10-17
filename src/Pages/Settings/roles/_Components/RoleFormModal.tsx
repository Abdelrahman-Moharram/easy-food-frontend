
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAddRoleMutation, useEditRoleMutation } from '../../../../redux/api/rolesApi'
import { useRoles } from '../../../../Components/Hooks/Auth/useRoles'
import Button from '../../../../Components/Common/Button'
import { Input } from '../../../../Components/Forms'
import { Modal } from '../../../../Components/Modals'
import { useTranslation } from "react-i18next";


interface Props{
    handleToggler:()=>void,
    open:boolean,
    roleId?: string
}

const RoleFormModal = ({handleToggler, open, roleId}:Props) => {    
    const {t} = useTranslation();
    const [addRole, {isLoading}] = useAddRoleMutation()
    const [editRole, {isLoading:editLoading}] = useEditRoleMutation()
    const {
        form,
        error,
        onChange,
        setError,
        setForm,
        getAsFormData
    } = useRoles({roleId})

    useEffect(()=>{
        if(!open){
            setForm({id:'', name:''})
        }
    }, [open])
    
    
    
    const handleRole = () =>{
        if(error){
            toast.error(t("Please enter the role name correctly"))                
            return
        }
        if(form.id){
            editRole({id:form.id, form:getAsFormData()})
            .unwrap()
            .then(res=>{
                handleToggler()
                setForm({id:'', name:''})                
                toast.success(res?.message)        
            }).catch(err=>{
                console.log(err);
                const error = err?.data?.errors
                if(!error)
                    toast.error(err?.data?.error || t("Something went wrong please try again later"))        
                else        
                    setError(error)
            })

        }else{
            addRole({form:getAsFormData()})
            .unwrap()
            .then(res=>{
                handleToggler()
                setForm({id:'', name:''})
                toast.success(res?.message)
            }).catch(err=>{
                console.log(err);
                const error = err?.data?.errors
                if(!error)
                    toast.error(err?.data?.error ||t("Something went wrong please try again later"))        
                else        
                    setError(error)
            })
        }
    }
        const isSaveDisabled = !form.name.trim() || form.name.length > 10 || form.name.length<3;

    return (
        <Modal
            handleToggler={handleToggler}
            open={open}
        >
            <div className="w-[50vw] my-8">
                <Input
                    label={t("Role Name")}
                    labelId='name'
                    type='text'
                    value={form.name}
                    onChange={onChange}
                    max_length={10} 
                    errors={error}
                    placeholder={t("Role Name")}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleRole} variant='primary' title={t("Save")} isLoading={isLoading||editLoading} disabled={isSaveDisabled} />
                <Button 
                    variant='secondary'
                    onClick={handleToggler}
                    isLoading={false}
                    title={t("Cancle")}
                />
                
        </div>
        </Modal>
    )
}

export default RoleFormModal
