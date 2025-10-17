import {  useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Cool = () => {
    const navigate = useNavigate();

  const {t, i18n} = useTranslation();
  return (
          // className={`bg-login-image ${i18n.language === "ar" ? "scale-x-[-1]" : ""} `}>

    <main className="bg-login-image flex items-center justify-center h-screen">
  <div className="bg-black bg-opacity-50 p-10 rounded-xl shadow-xl w-[90%] max-w-md">
        <p className="text-white mt-6">
                   {t("Don't have an account?")}{' '}</p>

    
  </div>
</main>

  )
}

export default Cool
