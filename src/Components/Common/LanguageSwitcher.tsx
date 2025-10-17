import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";


// const FlagSA = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5 rounded-sm">
//     <path fill="#006c35" d="M0 0h640v480H0z"/>
//     <path fill="#fff" d="M492.5 251.3h-79.4v24.5h-48.5v-24.5h-79.4v-24.4h207.3zM337.2 194.4c-12.5 0-22.7-10.1-22.7-22.6s10.2-22.6 22.7-22.6c12.5 0 22.7 10.1 22.7 22.6s-10.2 22.6-22.7 22.6zm-94.1 0c-12.5 0-22.7-10.1-22.7-22.6s10.2-22.6 22.7-22.6 22.7 10.1 22.7 22.6-10.2 22.6-22.7 22.6zm188.2 0c-12.5 0-22.7-10.1-22.7-22.6s10.2-22.6 22.7-22.6 22.7 10.1 22.7 22.6-10.2 22.6-22.7 22.6z"/>
//   </svg>
// );

// const FlagUK = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-5 rounded-sm">
//     <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
//     <clipPath id="b"><path d="M30 15h30v15zv15H0zM0 0h30v15zv15H0z"/></clipPath>
//     <g clipPath="url(#a)">
//       <path fill="#012169" d="M0 0h60v30H0z"/>
//       <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30"/>
//       <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30M60 0L0 30" clipPath="url(#b)"/>
//       <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/>
//       <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60"/>
//     </g>
//   </svg>
// );

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  // const currentFlag = i18n.language === "ar" ? <FlagSA /> : <FlagUK />;
  const currentLang = i18n.language === "ar" ? "العربية" : "English";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition">
          {/* {currentFlag}  */}
          {currentLang}
          <svg
            className="h-4 w-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 8l4 4 4-4"
            />
          </svg>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage("ar")}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm w-full text-start"
                  )}
                >
                  {/* <FlagSA />  */}
                  العربية
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage("en")}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm w-full text-start"
                  )}
                >
                  {/* <FlagUK /> */}

                  English
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;
