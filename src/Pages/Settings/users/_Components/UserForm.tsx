
import React from 'react'
import { toast } from 'react-toastify'
import { useAddUserMutation, useEditUserMutation } from '../../../../redux/api/accountsApi'
import { useUsersForm } from '../../../../Components/Hooks/Auth/useAccounts'
import { emailRegex, fullNameRegex, usernameRegex } from '../../../../Components/Hooks/Common/validationsRegexRepo'
import { Input, SelectInput } from '../../../../Components/Forms'
import OverLayFuncArea from '../../../../Components/Modals/OverLayFuncArea'
import Button from '../../../../Components/Common/Button'
import { useTranslation } from "react-i18next";

interface baseType{
    id:string,
    name:string,
}
const UserForm = ({action, open, userId}:{action:()=>void, open:boolean, userId?:string}) => {
    const {t} = useTranslation();
    const [addUser, {isLoading:addLoading}] = useAddUserMutation()
    const [editUser, {isLoading:editLoading}] = useEditUserMutation()
    const {
        user,
        formErrors,
        dropDowns,
        onChange,
        selectChange,
        setFormErrors,
        getUserAsFormData,
        validateForm
    } = useUsersForm({userId, toggler:open})
    const handleUser = () =>{
        if(userId){
            setFormErrors({...formErrors, password:null})
        }
        
        if(validateForm()){
            toast.error(t("you should solve these errors before Re-Submission"))
            return
        }
        if(userId)
        {
            editUser({id:userId, form:getUserAsFormData()})
                .unwrap()
                .then(res=>{
                    toast.success(res?.message || t("user saved successfully"))
                    action()
                })
                .catch(err=>{
                    setFormErrors(err?.data?.errors)                                    

                    if(err?.data?.errors)
                            setFormErrors(err?.data?.errors)
                    else
                        toast.error(err?.message || err?.error || t("user didn't saved successfully"))
                })
        }else{
            addUser({form:getUserAsFormData()})
                .unwrap()
                .then(res=>{
                    toast.success(res?.message || t("Something went wrong please try again later"))
                    console.log(res);
                    
                    action()
                })
                .catch(err=>{
                    if(err?.data?.errors)
                        setFormErrors(err?.data?.errors)
                    else
                        toast.error(err?.message || err?.error || t("user didn't saved successfully"))
                    })
        }
    }
  return (
    <div className='relative min-h-[80%] px-12 mt-12'>
        <div className="grid grid-cols-2 gap-3 h-[80%] overflow-y-auto">
            <div className="mb-2">
                <Input
                    onChange={(e) => onChange(e, { regex: usernameRegex})}
                    value={user.username}
                    label={t("Username")}
                    labelId='username'
                    type='text'
                    errors={formErrors?.username}
                    required={true}
                />
            </div>
            <div className="mb-2">
                <Input
                    onChange={(e) => onChange(e, { regex: emailRegex})}
                    value={user.email}
                    label={t("email")}
                    labelId='email'
                    type='text'
                    errors={formErrors?.email}
                    required={true}
                />
            </div>
            <div className="mb-2">
                <Input
                    onChange={(e) => onChange(e, { regex: fullNameRegex})}
                    value={user.full_name}
                    label={t("Full Name")}
                    labelId='full_name'
                    type='text'
                    errors={formErrors?.full_name}
                    required={true}
                />
            </div>
            
            <div className="mb-2">
                <SelectInput
                    labelId='role'
                    label={t("Role")}
                    onChange={selectChange}
                    value={user?.role}
                    required={true}
                    errors={formErrors?.role}
                >
                    {
                        dropDowns?.roles?.length?
                            dropDowns?.roles.map((role:baseType)=>(
                                <option key={role?.id} value={role?.id}>{role?.name}</option>   
                            ))
                        :
                        null
                    }  
                </SelectInput>
            </div>
            
            {
                userId
                ?
                    null
                :
                <div className="col-span-1 mb-2">
                    <Input
                        onChange={e=>onChange(e, { minLength: { value: 8, message: 'Password should have at least 8 letters' } })}
                        value={user.password}
                        label={t("Password")}
                        labelId='password'
                        type='password'
                        errors={formErrors?.password}
                        required={true}
                    />
                </div>
            }
        </div>
        <OverLayFuncArea
            open={open}
        >
            <Button 
                onClick={action}
                variant='secondary'
                title={t("Cancle")}
                isLoading={false}
            />
            <Button onClick={handleUser} variant='primary' title={t("Save")} isLoading={addLoading||editLoading} />
        </OverLayFuncArea>
    </div>
  )
}

export default UserForm
