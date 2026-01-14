import React, { ChangeEvent, useState } from 'react'
import { FaEye } from 'react-icons/fa';

interface props {
	labelId		 	: string;
	value		 	: string | number | null;
	type		 	: 'text' | 'number' | 'password';

	label?		 	: string
	onChange	 	: (e:ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?	 	: (event:React.KeyboardEvent<HTMLInputElement>) => void;
	required?	 	: boolean;
    children?	 	: React.ReactNode | undefined
    defaultValue?	: string | number,
	placeholder?	: string,
	inputClassName?	: string,
	
	disabled?		: boolean,
	max_length?		: number
    errors?
}

const Input = ({
    labelId,
	type,
	onChange,
	onKeyDown,
	value,
	label,
	placeholder,
    children,
    defaultValue,
    errors,
	inputClassName,
	max_length,
	required = false,
	disabled = false,
}: props) => {
    const [inputType, setType] = useState(type)	
	return (
		<div className='p-0 space-y-1'>
			{
				label?
					<label 
						htmlFor={labelId}
						className={"block text-[10px] font-bold uppercase text-neutral-500 mb-1 "+ (errors?.length?"border-red-500":" border-none ")}
					> 
						{label}
					</label>
				:null
			}
			<div className='relative'>
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
					className={`mt-0 w-full py-1 px-3 blur-none h-full border text-sm rounded-lg outline-none bg-neutral-50 ${inputClassName} ${errors?.length ? "border-red-500" : ""}`}
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
					<div className="absolute"> 
							<div className="">
								<span key={errors} className='text-red-500 block'>{errors}</span>
							</div>
					</div>
				:
					errors?.length?
						<div className="absolute">
							<div className="">
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