import { ChangeEvent, useEffect, useState } from "react"
import { DefaultInputValidate } from "../Common/useValidations";
import { useGetAddUserDropDownsQuery, useUserDetailsMutation } from "../../../redux/api/accountsApi";
import { SingleValidationRules } from "../../Types/Others";
import { UserType } from "../../Types/Accounts";

const emptyUser = {
    id: '',
    full_name: '',
    username: '',
    role: '',
    email: '',
    user_type: '',
    password:''
}


export const useUsersForm = ({userId, toggler}:{userId?:string, toggler?:boolean}) =>{
    
    
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetAddUserDropDownsQuery(undefined)
    const [userDetails] = useUserDetailsMutation()
    const [user, setLawyer] = useState<UserType>(emptyUser)

    useEffect(()=>{
        if(userId){
            userDetails({id:userId})
            .unwrap()
            .then(res=>{
                setLawyer(res?.user)
            })
            .catch(err=>{
                console.log(err);
            })
        }else{
            setLawyer(emptyUser)
        }
    }, [userId, toggler])

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:SingleValidationRules ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})   
        }
        setLawyer({ ...user, [name]: value });
    };
    
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:SingleValidationRules)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        else{
            setFormErrors({...formErrors, [name]:undefined})
        }
        setLawyer({ ...user, [name]: value });
    }


    const getUserAsFormData = () =>{
        
        const formData = new FormData()
        if(user?.id)
            formData.append('id', user.id)
        formData.append('username', user.username)
        formData.append('full_name', user.full_name)
        formData.append('email', user.email)
        formData.append('role', user.role)
        formData.append('user_type', user.user_type)
        if(!userId)
            formData.append('password', user.password)

        return formData
    }


    const validateForm = (): boolean => {
        
        return !(formErrors) || Object.keys?.(formErrors)?.length === 0;
    };

    return {
        user,
        formErrors,
        dropDowns,
        setFormErrors,
        onChange,
        selectChange,
        getUserAsFormData,
        validateForm
    }

}
