import React, { ChangeEvent } from 'react'

interface props {
    labelId: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    value: string;
    label?: string
    required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number,
    placeholder?: string
}

const ColorInput = ({
    labelId,
    onChange,
    value,
    label,
    required = false,
    errors,
}: props) => {
    return (
        <div className='p-0'>
            <label htmlFor={labelId} className="block text-sm font-medium mb-2">{label}</label>
            <input 
                type="color" 
                className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                id={labelId} 
                value={value}
                required={required}
                title="Choose your color" 
                onChange={onChange}
                name={labelId}
            />
            {
                typeof(errors) === 'string'?
                    <div className="mb-3">
                            <div className="absolute">
                                <span key={errors} className='text-red-500 block'>{errors}</span>
                            </div>
                    </div>
                :
                    errors?.length?
                        <div className="mb-3">
                            <div className="absolute">
                                {
                                    errors?.map(error=>
                                        <span key={error} className='text-red-500 block'>{error}</span>
                                    )
                                }
                            </div>
                        </div>
                    :null
            }
        </div>
    );
}

export default ColorInput