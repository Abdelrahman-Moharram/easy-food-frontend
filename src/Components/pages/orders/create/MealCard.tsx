import { AlertCircle, Minus, Plus } from 'lucide-react';
import EditableField from '../../../ui/Forms/EditableField';
import { showMessage } from '../../../ui/Common/ShowMessage';
import useForm from '../../../ui/Hooks/Forms/useForm';
import { useAddToCartMutation } from '../../../../redux/api/cartApi';

interface sizeType {
  id: string;
  name: string;
  price: number;
}

interface MealCardType {
  id: string;
  name: string;
  description?: string;
  prices: sizeType[];
  
}

const MealCard = ({ id, name, description, prices }:MealCardType) => {
  
  const [addToCart]       = useAddToCartMutation()
  const emptyMealForm     = {comment:'', size:null, count: 1}
  const {
    form,
    formErrors,
    setForm,
    setFormErrors,
  } = useForm(emptyMealForm)
  

  const handleSize = (s:sizeType|null) => {
    setForm({...form, size:s})
  }

  const handleComment = (value:string) => {
    setForm({...form, comment:value})
  }
  
  const updateCount = (value:number) => {
    setForm({...form, count:value})
  }

  const handleAddToCart = () => {
    if(!form?.size){
      showMessage('toast', 'error', 'you should select a valid size first')
      return
    }

    const formData = new FormData()
    formData.append('meal', id)
    formData.append('size', form?.size.id)
    formData.append('count', form.count)
    formData.append('comment', form?.comment)
    
    setFormErrors({})
    addToCart({form:formData})
    .unwrap()
    .then(()=>{
      setForm(emptyMealForm)
    }).catch(err=>{
      console.log(err);
      setFormErrors(err?.data)
    })
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full ${formErrors?.count ? 'border-red-500' : ''}`}>
      <div className="pt-5 pb-2 px-5 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-neutral-800">{name}</h3>
          <span className="text-primary font-bold text-lg">
            ${form?.size?.price || 0}
          </span>
        </div>

        
        
        {description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4 italic">
            {description}
          </p>
        )}


        {prices && prices.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {prices.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleSize(variant)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  form?.size?.id === variant.id
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <div className="flex justify-center max-w-[5rem] items-center gap-2 bg-white rounded-lg border border-neutral-100 p-1">
            <button
              onClick={() => updateCount(form?.count-1)}
              disabled={form?.count < 2}
              className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
            >
                <Minus size={14} />
            </button>
            
            <span className="text-sm font-bold w-6 text-center">{form?.count}</span>
            
            <button 
              onClick={() => updateCount(form?.count+1)}
              className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
            >
                <Plus size={14} />
            </button>
          </div>
        </div>
        
        <div className="my-0">
          <EditableField 
            value={form?.comment}
            onSave={(val) => handleComment(val)}
            className="text-xs text-neutral-500 mt-0 font-serif cursor-text hover:text-neutral-700 transition-colors block"
            inputClassName="text-xs text-neutral-500 mt-0 font-serif w-full bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none resize-none"
            placeholder="ex.don't add suger "
            as="textarea"
            rows={2}
          />
        </div>
        {formErrors && Object.keys(formErrors).length > 0 && (
          <div className="mt-3 bg-red-50/50 border-l-2 border-red-500/50 p-2 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200 max-h-24 overflow-y-auto w-full max-w-full custom-scrollbar">
            <div className="flex gap-2 w-full">
              <AlertCircle size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0 overflow-hidden">
                <ul className="space-y-0.5 w-full">
                  {Object.keys(formErrors).map((key, index) => (
                    <li key={index} className="text-[10px] text-red-700 leading-tight break-all">
                      <span className="font-bold capitalize whitespace-nowrap">{key.replace('_', ' ')}:</span> 
                      <span className="ml-1">{Array.isArray(formErrors[key]) ? formErrors[key][0] : formErrors[key]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-neutral-50 border-t border-neutral-100">
        
        <button
          onClick={handleAddToCart}
          disabled={!form?.size}
          className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          <Plus size={18} />
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default MealCard;
