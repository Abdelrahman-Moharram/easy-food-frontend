import { useState, ChangeEvent, FormEvent } from 'react';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { useLoginMutation } from '../../../redux/features/authApiSlice';
import { setAuth } from '../../../redux/features/authSlice';


export default function useLogin() {
	const navigate = useNavigate();
	const [errors, setErrors] = useState();
	const [searchParams] = useSearchParams()

	const next = searchParams.get('next')

	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ username, password })
			.unwrap()
			.then((data) => {
				Cookies.set('access_token', data?.access, {expires: new Date(new Date().getTime() + 72 * 60 * 60 * 1000)})
				dispatch(setAuth(jwtDecode(data?.access)));
				// toast.success('logged in successfully');
				navigate(next || '/');
				return
 
			})
			.catch((err) => {
				setErrors(err?.data);
			});
	};
	return {
		username,
		password,
		isLoading,
		onChange,
		onSubmit,
		errors
	};
}