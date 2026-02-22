import { CheckCircle2, ShoppingCart } from 'lucide-react'
import { useCreateOrderMutation, useGetCartQuery } from '../../../../redux/api/ordersApi';
import CartItem from './CartItem';
import Button from '../../../ui/Common/Button';
import { CurrencyIcon } from '../../../utils/Icons';
import { FormEvent } from 'react';
import { showMessage } from '../../../ui/Common/ShowMessage';
import SelectPaymentMethod from './SelectPaymentMethod';
import useForm from '../../../ui/Hooks/Forms/useForm';




const Cart = () => {
    const { data: cartItems = [], isLoading }       = useGetCartQuery();
    const [createOrder, {isLoading:orderLoading}]   = useCreateOrderMutation()
    const total                                     = cartItems.reduce((sum: number, item: any) => sum + (Number(item?.size?.price) * item?.count), 0);
    
    const {
        form,
        onChange,
        getFormData
    } = useForm({payment_method:''})

    console.log(form);
    

    const onSubmit = (e:FormEvent) =>{
        e.preventDefault()

        createOrder({form:getFormData()})
        .unwrap()
        .then(()=>{
            showMessage('toast', 'success', 'order placed successfully')
        }).catch((err)=>{
            showMessage('toast', 'error', err?.error || 'order placed successfully')
            
        })
    }
  return (
    <form onSubmit={onSubmit} className="w-full lg:w-96">
        <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-6 sticky top-10">
        <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
            <ShoppingCart size={24} className="text-primary" />
            Your Order
        </h3>

        {!cartItems.length ? 
            <div className="py-12 text-center">
                <div className="bg-neutral-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={24} className="text-neutral-300" />
                </div>
                <p className="text-neutral-400">Cart is empty</p>
            </div>
        : 
            <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                    {cartItems.map((item: any) => (
                        <CartItem 
                            item={item}
                        />
                    ))}
                </div>

                <div className="my-3">
                    <SelectPaymentMethod
                        paymentMethod={form?.payment_method}
                        onChange={onChange}
                    />
                </div>



                <div className="space-y-4 pt-6 border-t border-dashed border-neutral-200">
                    <div className="flex justify-between text-neutral-500">
                        <span>Subtotal</span>
                        <span><CurrencyIcon />{total}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-neutral-900 pt-2">
                        <span>Total</span>
                        <span className="text-primary">{total}</span>
                    </div>
                    
                    

                    <Button 
                        title={'Place Order'}
                        variant='primary'
                        disabled={isLoading || orderLoading}
                        isLoading={orderLoading}
                        fontBold
                        submit
                        icon={<CheckCircle2 size={20} />}
                        className={'shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed py-4'}
                    />
                </div>
            </>
        }
        </div>
    </form>
  )
}

export default Cart
