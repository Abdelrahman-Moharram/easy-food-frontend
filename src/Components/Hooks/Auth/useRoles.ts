import { ChangeEvent, useEffect, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";
import { baseType, SingleValidationRules } from "../../Types/Others";
import { useRoleDetailsMutation } from "../../../redux/api/rolesApi";

const baseRole = {
    id:'',
    name:''
}
export const useRoles = ({roleId}:{roleId?:string}) =>{
    const [getRoleFormData] = useRoleDetailsMutation()
    const [error, setError] = useState<any>([])
    const [form, setForm] = useState<baseType>(baseRole)

    useEffect(()=>{       
        if(roleId)
            getRoleFormData({id:roleId})   
                .unwrap()
                .then(res=>{
                    setForm(res.role)
                })      
        else
            setForm(baseRole)
    }, [roleId])

    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:SingleValidationRules ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setForm({ ...form, name: value });
    };

    const getAsFormData = () =>{
        
        const formData = new FormData()
        if(form?.id)
            formData.append('id', form.id)
        formData.append('name', form.name)

        return formData
    }

    return {
        form,
        onChange,
        error,
        setError,
        setForm,
        getAsFormData
    }
} 