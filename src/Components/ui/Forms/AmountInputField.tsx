import React, { ChangeEvent, useEffect, useState } from 'react'
import { numberToMoney } from '../../utils/helper';
import Input from './Input';

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number | null;
	label?: string,
    currency?:React.ReactNode,
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number,
	placeholder?: string
}
const AmountInputField = ({
    labelId,
	onChange,
	value,
    currency,
	label,
	placeholder,
	required = false,
    defaultValue,
    errors,
}: props) => {
    const [amountValue, setAmountValue] = useState<number|string>('')
    useEffect(()=>{
        const val = numberToMoney(value)
        setAmountValue(val === 0 || val === '0'?"":val)
    }, [value])

    const handleAmountValue = (e:ChangeEvent<HTMLInputElement>) =>{
        // setAmountValue(numberToMoney(e.target.value))
        const val = numberToMoney(e.target.value)

        setAmountValue(val === 0 || val === '0'?"":val)

        e.target.value = e.target.value.replace(/[^0-9.]/g, '')
        onChange(e)        
    }
  return (
    <div className="relative">
        <Input
            type={'text'}
            label={label}
            labelId={labelId}
            errors={errors}
            onChange={handleAmountValue}
            value={amountValue?.toString()}
            defaultValue={defaultValue}
            required={required}
            placeholder={placeholder}
        />
        <span 
            className='absolute end-2 font-bold text-[10px] top-[30%] transition-all '
        >
            {currency?currency:'L.E'}
        </span>
    </div>
  )
}

export default AmountInputField
