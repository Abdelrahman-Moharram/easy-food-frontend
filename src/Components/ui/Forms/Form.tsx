import { ChangeEvent, FormEvent } from 'react';

import ErrorAlert from '../alerts/ErrorAlert';
import Input from './Input';
import Button from '../Common/Button';

interface Config {
	labelText: string;
	labelId: string;
	type: 'text' | 'password' | 'number';
	value: string;
	placeholder?: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	errors? : any
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
	errors,
}: Props) {
	
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{
				errors?.non_field_errors?
					<ul className='list-disc'>
						{
							errors['non_field_errors']?.map((i:string)=>(
								<li key={i} className='text-red-500'>{i}</li>
							))
						}
					</ul>
				:null
			}
			{
				errors?.detail?
					<ErrorAlert 
						text={errors.detail}
					/>
				:null
			}
			{config.map(input => (
				<Input
					label={input.labelText}
					key={input.labelId}
					inputClassName='py-3 rounded-xl bg-gray-300'
					labelId={input.labelId}
					type={input.type}
					onChange={(e:ChangeEvent<HTMLInputElement>)=>onChange(e)}
					value={input.value}
					required={input.required}
					errors={errors?.labelId || []}	
				/>
			))}

			<div className='pt-8'>
				<Button 
					title={btnText}
					isLoading={isLoading}
					variant='primary'
					submit
				/>
			</div>
		</form>
	);
}