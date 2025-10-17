import {  useNavigate } from 'react-router-dom';
import { LoginForm } from '../../Components/Forms'
import { useTranslation } from "react-i18next";

const Login = () => {
    const navigate = useNavigate();

  const {t, i18n} = useTranslation();
  return (

    <main className="bg-login-image flex items-center justify-center h-screen">
  <div className="bg-black bg-opacity-50 p-10 rounded-xl shadow-xl w-[90%] max-w-md">
    <LoginForm />
        <p className="text-white mt-6">
                   {t("Don't have an account?")}{' '}</p>
          <button
            onClick={() => navigate("/auth/signup", { replace: true })}
            className="text-blue-400 hover:text-blue-500 font-semibold underline"
          >
            {t("Register here")}
          </button>

    
  </div>
</main>

  )
}

export default Login
