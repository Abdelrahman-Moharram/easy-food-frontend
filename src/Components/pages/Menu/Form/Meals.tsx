import { FormEvent } from "react"
import { useAddMenuMealMutation, useGetSectionsListQuery } from "../../../../redux/api/menusApi"
import Button from "../../../ui/Common/Button"
import { Input, SelectInput, TextArea } from "../../../ui/Forms"
import AmountInputField from "../../../ui/Forms/AmountInputField"
import useForm from "../../../ui/Hooks/Forms/useForm"
import SectionHeader from "./SectionHeader"
import { showMessage } from "../../../ui/Common/ShowMessage"
import { useTranslation } from "react-i18next"

const emptyMealForm = {name:'',description:'',price:'',section:''}


const MealsForm = () => {
    const {data:sections}           = useGetSectionsListQuery({refetchOnMountOrArgChange:true, refetchOnReconnect:true})
    const {t}                       = useTranslation()
    const [addMeal, {isLoading}]    = useAddMenuMealMutation()
     
    const {
        form,
        formErrors,
        setForm,
        onChange,
        validateForm,
        getFormData
    } = useForm(emptyMealForm)


    const onSubmit = (e:FormEvent) =>{
        e.preventDefault()

        if(!validateForm()){
            showMessage('toast', 'error', t('please enter a valid meal'))
            return
        }
        addMeal({form:getFormData()})
        .unwrap()
        .then((res)=>{
            setForm(emptyMealForm)
            showMessage('toast', 'success', res?.message)
        }).catch(err=>{
            console.log(err);
            showMessage('toast', 'error', err?.error)
        })

    }
  return (
    <div className="sticky top-8 space-y-6">
        
        <SectionHeader 
            name="Meals"
        />
        {/* 2. ITEM CREATOR */}

        <div className="bg-container p-6 shadow-lg border border-neutral-200 relative overflow-hidden rounded-lg">
            {/* <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-100 -mr-8 -mt-8 rounded-full"></div> */}
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 relative z-10">Step 2: Add Dish</h3>
            
            <form onSubmit={onSubmit} className="space-y-6 relative z-10">
            {/* Category Select */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Category</label>
                <SelectInput 
                    labelId="section"
                    onChange={onChange}
                    value={form?.section}
                    errors={formErrors?.section}
                    options={sections?.map(sec=>({value:sec?.id, label:sec?.name}))}
                    required
                />
            </div>

            {/* Name & Price Row */}
            <div className="flex gap-3">
                <div className="w-2/3">
                    <label 
						htmlFor={"name"}
						className={"block text-[10px] font-bold uppercase text-neutral-500 mb-1 "+ (formErrors?.name?.length?"border-red-500":" border-none ")}
					> 
						Dish Name 
					</label>
                    <Input 
                        labelId="name"
                        onChange={onChange}
                        type="text"
                        value={form?.name}
                        max_length={255}
                        required
                        placeholder="e.g. steak"
                        errors={formErrors?.name}
                    />
                </div>
                <div className="w-1/3">
                    <label 
                        htmlFor={"price"}
                        className={"block text-[10px] font-bold uppercase text-neutral-500 mb-1 "+ (formErrors?.price?.length?"border-red-500":" border-none ")}
                    > 
                        Price
                    </label>
                    <AmountInputField 
                        labelId="price"
                        onChange={onChange}
                        value={form?.price}
                        required
                        placeholder="0.00"
                        errors={formErrors?.price}
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label 
                    htmlFor={"price"}
                    className={"block text-[10px] font-bold uppercase text-neutral-500 mb-1 "+ (formErrors?.description?.length?"border-red-500":" border-none ")}
                >
                    Description
                </label>

                <TextArea 
                    labelId="description"
                    onChange={onChange}
                    value={form?.description}
                    errors={formErrors?.description}
                    rows={4}
                    placeholder="ingredients ..."
                />
            </div>

            
            <Button 
                title='Add Item to Menu'
                variant='black'
                className="py-2"
                isLoading={isLoading}
                disabled={isLoading}
                submit
            />
            </form>
        </div>

    </div>
  )
}

export default MealsForm
