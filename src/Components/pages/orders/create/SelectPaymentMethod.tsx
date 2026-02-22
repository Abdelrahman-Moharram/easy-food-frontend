import React, { ChangeEvent } from 'react'
import { useGetPaymentMethodsQuery } from '../../../../redux/api/utilsApi'
import RadioButton from '../../../ui/Forms/RadioButton'

interface paymentMethodType{
    id      : string,
    name    : string,
    code    : string
}

const SelectPaymentMethod = ({paymentMethod, onChange}:{paymentMethod: string, onChange:(event: ChangeEvent<HTMLInputElement>) => void}) => {
  const {data: paymentMethods}        = useGetPaymentMethodsQuery()

  return (
    <div className='space-y-4 p-3 rounded-lg drop-shadow-md'>
        {
            paymentMethods?.map((method:paymentMethodType)=>(
                <RadioButton 
                  name='payment_method'
                  labelId={method?.id}
                  key={method.id}
                  label={method?.name}
                  onChange={onChange}
                  checked={paymentMethod == method?.id}
                />
            ))
        }
    </div>
  )
}

export default SelectPaymentMethod
