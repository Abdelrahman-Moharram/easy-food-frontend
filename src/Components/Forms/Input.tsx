import React, { ChangeEvent, useState } from 'react'
import { FaEye } from 'react-icons/fa';

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event:React.KeyboardEvent<HTMLInputElement>) => void;
	value: string | number | null;
	label?: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?
    defaultValue?:string|number,
	placeholder?: string,
	inputClassName?:string,
	disabled?:boolean,
	max_length?:number
}

const Input = ({
    labelId,
	type,
	onChange,
	onKeyDown,
	value,
	label,
	placeholder,
	required = false,
	disabled = false,
    children,
    defaultValue,
    errors,
	inputClassName,
	max_length
}: props) => {
    const [inputType, setType] = useState(type)	
	return (
		<div className='p-0'>
			<label 
				htmlFor={labelId}
            	className={"block text-md font-bold text-white   "+ (errors?.length?"border-red-500":" border-none ")}
			> 
				{label} 
			</label>
			<div className='relative mt-[4px]'>
				<input
					type={inputType}
					name={labelId}
					id={labelId}
					disabled={disabled}
					onChange={(e)=>{
						let value = e.target.value
						if (max_length && value.length > max_length) {value = value.slice(0, max_length);}
						e.target.value = value
						onChange(e)
					}}
					onKeyDown={onKeyDown}
					value={value?.toString()}
					defaultValue={defaultValue}
					required={required}
					placeholder={placeholder}
					className={`mt-0 w-full py-1 px-4 blur-none h-full border border-[#E3E5E5] rounded-lg outline-none ${inputClassName} ${errors?.length ? "border-red-500" : ""}`}
				/>
				{
					type === 'password' ? (
					<button 
						type='button'
						onClick={() => setType(inputType === 'text' ? 'password' : 'text')}
						className='absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 transition-all hover:bg-secondary/20'
					>
						<FaEye />
					</button>
					) : null
				}
			</div>
			{children}
			{
				typeof(errors) === 'string'?
					<div className="mb-3">
							<div className="relative">
								<span key={errors} className='text-red-500 block'>{errors}</span>
							</div>
					</div>
				:
					errors?.length?
						<div className="mb-3">
							<div className="relative">
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

export default Input