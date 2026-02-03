import { Plus } from 'lucide-react';
import { useAddToCartMutation } from '../../../../redux/api/ordersApi';
import EditableField from '../../../ui/Forms/EditableField';
import { showMessage } from '../../../ui/Common/ShowMessage';
import useForm from '../../../ui/Hooks/Forms/useForm';

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
  const emptyMealForm     = {comment:'', size:null}
  const {
    form,
    setForm,
  } = useForm(emptyMealForm)
  

  const handleSize = (s:sizeType|null) => {
    setForm({...form, size:s})
  }

  const handleComment = (value:string) => {
    setForm({...form, comment:value})
  }

  const handleAddToCart = () => {
    if(!form?.size){
      showMessage('toast', 'error', 'you should select a valid size first')
      return
    }

    const formData = new FormData()
    formData.append('meal', id)
    formData.append('size', form?.size.id)
    formData.append('count', '1')
    formData.append('comment', form?.comment)
    

    addToCart({form:formData})
    .unwrap()
    .then(()=>{
      setForm(emptyMealForm)
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-1">
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

        {prices.length > 1 && (
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
        
        <div className="">
          <EditableField 
            value={form?.comment}
            onSave={(val) => handleComment(val)}
            className="text-xs text-neutral-500 mt-1 font-serif cursor-text hover:text-neutral-700 transition-colors block"
            inputClassName="text-xs text-neutral-500 mt-1 font-serif w-full bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none resize-none"
            placeholder="Comment"
            as="textarea"
            rows={2}
          />
        </div>
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
