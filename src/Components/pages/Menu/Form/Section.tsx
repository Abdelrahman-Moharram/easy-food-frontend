 import { FormEvent } from 'react'
import Button from '../../../ui/Common/Button'
import { Input } from '../../../ui/Forms'
import useForm from '../../../ui/Hooks/Forms/useForm'
import { emptySectionForm } from './Types'
import { showMessage } from '../../../ui/Common/ShowMessage'
import { useTranslation } from "react-i18next";
import { useAddSectionMutation } from '../../../../redux/api/menusApi'

const SectionForm = ({resturant_id}:{resturant_id:string}) => {
    const {t}                       = useTranslation()
    const [addSection, {isLoading}] = useAddSectionMutation()
    const {
        form,
        formErrors,
        onChange,
        validateForm,
        getFormData
    } = useForm(emptySectionForm)


    const onSubmit = (e:FormEvent) =>{
        e.preventDefault()
        
        if(!validateForm()){
            showMessage('toast', 'error', t('please enter a valid section name'))
            return
        }
        if(!resturant_id)
            return


        addSection({form:getFormData(), resturant_id})
            .unwrap()
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })

    }

  return (
    <div className="bg-white p-6 pb-8 shadow-lg border border-neutral-200 rounded-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Step 1: Create Category</h3>
        <form onSubmit={onSubmit} className="grid grid-cols-3 gap-2">
        
            <div className="col-span-2">
                <Input 
                    labelId='name'
                    onChange={(e)=>onChange(e, {minLength:{value:1}, maxLength:{value:150}})}
                    type='text'
                    value={form?.name}
                    required
                    errors={formErrors?.name}
                />
            </div>
            {/* <button type="submit" className="bg-neutral-900 text-white px-4 text-sm hover:bg-neutral-700 transition-colors">
                ADD
            </button> */}
            <Button 
                title='ADD'
                variant='black'
                submit
                disabled={isLoading}
                isLoading={isLoading}
                // className='text-sm'
            />
        </form>
    </div>
  )
}

export default SectionForm
