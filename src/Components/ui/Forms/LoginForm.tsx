import { useLogin } from '../Hooks/Auth';
import Form from './Form';
import { useTranslation } from "react-i18next";

export default function LoginForm() {
	const {t} = useTranslation();
	const { username, password, isLoading, onChange, onSubmit, errors } = useLogin();
	const config = [
		{
			labelText:t("Username"),
			labelId: 'username',
			type: 'username',
			value: username,
			required: true,
			placeholder:'username'
		},
		{
			labelText: t("Password"),
			labelId: 'password',
			type: 'password',
			value: password,
			placeholder:'password',
			link: {
				linkText: 'Forgot password?',
				linkUrl: '/password-reset',
			},
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText={t("Login")}
			onChange={onChange}
			onSubmit={onSubmit}
			errors={errors}
		/>
	);
}