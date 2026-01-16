import React, { FormEvent } from "react"
import { useAddMenuMealMutation, useGetSectionsListQuery } from "../../../../redux/api/menusApi"
import Button from "../../../ui/Common/Button"
import { Input, SelectInput, TextArea } from "../../../ui/Forms"
import AmountInputField from "../../../ui/Forms/AmountInputField"
import useForm from "../../../ui/Hooks/Forms/useForm"
import SectionHeader from "./SectionHeader"
import { showMessage } from "../../../ui/Common/ShowMessage"
import { useTranslation } from "react-i18next"

const emptyMealForm = {name:'',description:'',price:'', prices:[], section:''}


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

        const formData = getFormData();
        if(form.prices && form.prices.length > 0){
             formData.append('prices', JSON.stringify(form.prices))
        }

        addMeal({form:formData})
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
                </div>

            {/* Price Variants */}
            <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-2">Price Options</label>
                
                <div className="space-y-3 mb-3">
                    {form?.prices?.map((price: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-start">
                             <div className="w-1/2">
                                <Input 
                                    labelId={`price-name-${idx}`}
                                    onChange={(e) => {
                                        const newPrices = [...(form.prices || [])];
                                        newPrices[idx] = { ...newPrices[idx], name: e.target.value };
                                        setForm({ ...form, prices: newPrices });
                                    }}
                                    type="text"
                                    value={price.name}
                                    placeholder="Size (e.g. Small)"
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <AmountInputField 
                                    labelId={`price-val-${idx}`}
                                    onChange={(e) => {
                                        const newPrices = [...(form.prices || [])];
                                        newPrices[idx] = { ...newPrices[idx], price: e.target.value };
                                        setForm({ ...form, prices: newPrices });
                                    }}
                                    value={price.price}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const newPrices = form.prices.filter((_:any, i:number) => i !== idx);
                                    setForm({ ...form, prices: newPrices });
                                }}
                                className="mt-2 text-neutral-400 hover:text-red-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => {
                        const newPrices = [...(form.prices || []), { name: '', price: '' }];
                        setForm({ ...form, prices: newPrices });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                    + Add Price Option
                </button>
            </div>

            <div className="hidden">
            {/* Keeping hidden original price input for backward compatibility if needed, or just removing it if assured */}
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
                        // required
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
