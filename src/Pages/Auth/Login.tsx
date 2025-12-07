import { LoginForm } from '../../Components/ui/Forms'
import { useTranslation } from "react-i18next";
const Login = () => {
  console.log("Login");
  
  const {t, i18n} = useTranslation();
  
  return (
    <main className={``}>
      <div className='p-7 ml-5'></div>
      <div className="flex justify-between items-center h-screen z-10 relative">
        {
          i18n.language === 'en'?
            <div className="w-full"></div>
          :null
        }

        {/* form container */}
        <div className="w-[50%] lg:pr-16 bg-login-container">
          <div className=" bg-white lg:px-8 default-shadow-xl py-16 rounded-xl ">
            <div className='mb-4'>
              <h2 className='text-[40px] font-[400]'>{t("Hello")}</h2>
              <h2 className='text-[40px] font-[600] text-primary'> {t("Login")}</h2>
            </div>
            
            <LoginForm />
            

            <div className="flex justify-center mt-16"></div>
          </div>
        </div>

        {
          i18n.language === 'ar'?
            <div className="w-full"></div>
          :null
        }

      </div>
    </main>
  )
}

export default Login