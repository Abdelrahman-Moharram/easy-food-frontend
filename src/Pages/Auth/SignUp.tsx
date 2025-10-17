import {  useNavigate } from 'react-router-dom';
import React from 'react'
import { useTranslation } from "react-i18next";
import { RegisterForm } from '../../Components/Forms';

const SignUp = () => {
        const navigate = useNavigate();
      const {t, i18n} = useTranslation();
    
  return (
 <main className="bg-login-image flex items-center justify-center h-screen">
  <div className="bg-black bg-opacity-50 p-10 rounded-xl shadow-xl w-[90%] max-w-md">
 <RegisterForm/>
        <p className="text-white mt-6">
                   {t("I have an account?")}{' '}</p>
          <button
            onClick={() => navigate("/auth/login", { replace: true })}
            className="text-blue-400 hover:text-blue-500 font-semibold underline"
          >
            {t("Login here")}
          </button>

    
  </div>
</main>
  )
}

export default SignUp