import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../../redux/features/authApiSlice';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
	const navigate = useNavigate();
	const [errors, setErrors] = useState();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: '',
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		register({ first_name, last_name, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				navigate('/auth/login');
			})
			.catch((err:{data:any}) => {
				toast.error('Failed to register account');
				setErrors(err?.data);
			});
	};

	return {
		first_name,
		last_name,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
		errors
	};
}