import { useRemoveFromCartMutation, useUpdateCartItemMutation } from '../../../../redux/api/ordersApi'
import { showMessage } from '../../../ui/Common/ShowMessage'
import EditableField from '../../../ui/Forms/EditableField'
import { CartItemType } from './Types'
import { Minus, Plus, Trash2 } from 'lucide-react'


const CartItem = ({item}:{item:CartItemType}) => {
  const [updateCartItem] = useUpdateCartItemMutation()
  const [removeCartItem] = useRemoveFromCartMutation()
  
  const updateCount = (newCount:number) =>{
    if(newCount < 0){
        showMessage('toast', 'error', 'invalid meal amount')
        return
    }

    const form = new FormData()
    form.append('id'    , item?.id)
    form.append('count' , String(newCount))

    updateCartItem({form})
  }

  const updateMealComment = (comment:string) =>{
    
    const form = new FormData()
    form.append('id'        , item?.id)
    form.append('comment'   , comment)
    
    updateCartItem({form})
  } 

  const removeItem = () =>{
    removeCartItem({order_item_id:item?.id})
  }

  return (
    <div key={item?.id} className="flex gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
        <div className="flex-1">
            <h4 className="font-bold text-neutral-800 text-sm">{item?.meal?.name}</h4>
            <p className="text-xs text-neutral-400 capitalize">{item?.size?.name}</p>

            <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-neutral-100 p-1">
                    
                    <button
                        onClick={() => updateCount(item?.count-1)}
                        className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    
                    <span className="text-sm font-bold w-6 text-center">{item?.count}</span>
                    
                    <button 
                        onClick={() => updateCount(item?.count+1)}
                        className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
                    >
                        <Plus size={14} />
                    </button>

                </div>
            </div>
            <div className="mt-2">
                <EditableField 
                  value={item?.comment}
                  onSave={(val) => updateMealComment(val)}
                  className="text-xs text-neutral-500 mt-1 font-serif cursor-text hover:text-neutral-700 transition-colors block"
                  inputClassName="text-xs text-neutral-500 mt-1 font-serif w-full bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none resize-none"
                  placeholder="Comment"
                  as="textarea"
                  rows={2}
                />
            </div>
        </div>
        <div className="text-right flex flex-col justify-between items-end">
            <button 
                onClick={()=>removeItem()}
                className="opacity-0 group-hover:opacity-100 p-1 text-neutral-300 hover:text-red-500 transition-all"
            >
                <Trash2 size={16} />
            </button>
        <p className="font-bold text-neutral-800">${Number(item?.size.price) * item?.count}</p>
        </div>
    </div>
  )
}

export default CartItem
