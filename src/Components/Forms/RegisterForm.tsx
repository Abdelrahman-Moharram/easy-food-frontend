import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setAuth } from "../../redux/features/authSlice";
import { useRegisterMutation, useLoginMutation } from "../../redux/features/authApiSlice";
import useForm from "../Hooks/Forms/useForm";
import Form from "./Form";

export default function RegisterForm() {
    const emptyTemplateForm = {
        full_name: "",
        email: "",
        username: "",
        password: "",
        repassword: "",
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();

    const { form, formErrors, setFormErrors, onChange, validateForm } = useForm(emptyTemplateForm);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the validation errors");
            return;
        }

        try {
            const payload = {
                full_name: form.full_name,
                username: form.username,
                email: form.email,
                password: form.password,
                re_password: form.repassword,
            };

            await register(payload).unwrap();

            const loginData = await login({
                username: form.username,
                password: form.password,
            }).unwrap();

            Cookies.set("access_token", loginData.access, {
                expires: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
            });

            dispatch(setAuth(jwtDecode(loginData.access)));

            toast.success("Welcome! You are now logged in.");
            navigate("/");
        } catch (err: any) {
            console.error("Registration error:", err);
            if (err?.data) {
                setFormErrors(err.data); // ✅ عرض الأخطاء فوق الحقول
            }
            toast.error("Failed to register account");
        }
    };

    const config = [
        {
            labelText: "Full Name",
            labelId: "full_name",
            type: "text",
            value: form.full_name,
            required: true,
        },
        {
            labelText: "Email",
            labelId: "email",
            type: "email",
            value: form.email,
            required: true,
        },
        {
            labelText: "Username",
            labelId: "username",
            type: "text",
            value: form.username,
            required: true,
        },
        {
            labelText: "Password",
            labelId: "password",
            type: "password",
            value: form.password,
            required: true,
        },
        {
            labelText: "Confirm Password",
            labelId: "repassword",
            type: "password",
            value: form.repassword,
            required: true,
        },
    ];

    return (
        <Form
            config={config}
            isLoading={isRegistering || isLoggingIn}
            btnText="Sign up"
            onChange={onChange}
            onSubmit={onSubmit}
            errors={formErrors}
        />
    );
}
