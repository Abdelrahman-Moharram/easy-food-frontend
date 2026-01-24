import { LoginForm } from '../../Components/ui/Forms';
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full flex bg-gray-50 dark:bg-zinc-900 relative overflow-hidden">
      {/* Image Section - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900">
        <div className="absolute inset-0">
          <img 
            src="/login-bg.avif" 
            alt="Easy Food Ambience" 
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              // Fallback gradient if image is missing
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #00A8E8, #001233)';
            }}
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Branding / Text */}
        <div className="relative z-10 flex flex-col justify-end p-12 w-full text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Easy Food</h1>
          <p className="text-xl max-w-md opacity-90 drop-shadow-md leading-relaxed">
            {t("Experience the best food delivery service. Fresh, fast, and delicious.")}
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative animate-fade-in">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="w-full max-w-md bg-white dark:bg-zinc-800/80 p-8 md:p-10 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/30 border border-gray-100 dark:border-white/5 backdrop-blur-sm">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Welcome Back!")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t("Please login to continue to your account.")}
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
             <p className="text-xs text-gray-400 dark:text-gray-500">
                &copy; 2024 Easy Food. All rights reserved.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;