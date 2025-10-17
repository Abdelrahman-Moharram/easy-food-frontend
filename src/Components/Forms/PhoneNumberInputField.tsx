import React, { ChangeEvent } from 'react'
import Input from './Input'

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | null;
	label: string,
	required?: boolean;
    children?: React.ReactNode | undefined
    errors,
	placeholder?: string,
    inputClassName:string
}
const PhoneNumberInputField = ({
    labelId,
	onChange,
	value,
	label,
	placeholder,
	required = false,
    errors,
    inputClassName,
}: props) => {
  return (
    <div className="relative">
        <Input
            type='text'
            label={label}
            labelId={labelId}
            errors={errors}
            onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                e.target.value = onlyNumbers;
                onChange(e);
            }}
            value={value}
            required={required}
            placeholder={placeholder}
            inputClassName={inputClassName}
            max_length={10}
        />
       
    </div>
  )
}

export default PhoneNumberInputField
