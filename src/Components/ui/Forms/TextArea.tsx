import React, { ChangeEvent } from 'react'

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	label: string
	required?: boolean;
    errors?: [],
    placeholder?:string,
    rows?:number
}

const TextArea = ({labelId,
	onChange,
	value,
	label,
	required = false,
    errors,
    placeholder,
    rows=4
}: props) => {
  return (
    <div className=' p-0'>
        <label 
            htmlFor={labelId}
            className={"block text-md font-medium shadow-none drop-shadow-none outline-none text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
        > 
            {label} 
        </label>
        <textarea
            name={labelId}
            rows={rows}
            id={labelId}
            required={required}
            className={"mt-1 resize-none w-full py-2 px-4 border border-[#E3E5E5] rounded-xl outline-none "+ (errors?.length?"border-red-500":" ")}            
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        >
        </textarea>
        <div className="relative">
            {
                errors?.map(error=>
                    <span key={error} className='text-red-500 block'>{error}</span>
                )
            }
        </div>
    </div>
  )
}

export default TextArea
