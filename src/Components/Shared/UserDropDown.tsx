import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ImageSkeleton } from "../Common";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLogoutMutation } from "../../redux/features/authApiSlice";
import { setLogout } from "../../redux/features/authSlice";
interface user {
  full_name: string;
  username: string;
  id: string;
  role: string
}

interface Props {
  user: user;
}

const UserNavDropDown = ({ user }: Props) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        navigate("/auth/login");
      });
  };
  function classNames(...classes: string[]) {
    return classes.join(" ");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="text-color bg-transparent items-center inline-flex w-full justify-center gap-x-2 rounded-full px-3 py-2 text-sm font-semibold transition">
          {user?.id ? (
            <div className="flex items-center gap-2 ">
            {
            <div className="rounded-full border-2  P-2">
                <svg width="48" height="48" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M29 52.7737C42.1168 52.7737 52.75 42.1404 52.75 29.0237C52.75 15.9069 42.1168 5.27368 29 5.27368C15.8832 5.27368 5.25 15.9069 5.25 29.0237C5.25 42.1404 15.8832 52.7737 29 52.7737Z" fill="#061631"/>
                    <path d="M29 16.9824C24.0838 16.9824 20.0938 20.9724 20.0938 25.8887C20.0938 30.7099 23.87 34.6287 28.8812 34.7712C28.9525 34.7712 29.0475 34.7712 29.095 34.7712C29.1425 34.7712 29.2137 34.7712 29.2612 34.7712C29.285 34.7712 29.3088 34.7712 29.3088 34.7712C34.1062 34.6049 37.8825 30.7099 37.9062 25.8887C37.9062 20.9724 33.9163 16.9824 29 16.9824Z" fill="#061631"/>
                    <path d="M45.1034 46.4801C40.8759 50.3751 35.2234 52.7738 29.0009 52.7738C22.7784 52.7738 17.1259 50.3751 12.8984 46.4801C13.4684 44.3188 15.0122 42.3476 17.2684 40.8276C23.7522 36.5051 34.2972 36.5051 40.7334 40.8276C43.0134 42.3476 44.5334 44.3188 45.1034 46.4801Z" fill="#061631"/>
                </svg>

            </div>
            }

            <div className="">
                <div className="font-semibold">{user?.full_name}</div>
                <span className="font-light text-xs">{user?.role}</span>
            </div>


            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.6001 7.45825L11.1668 12.8916C10.5251 13.5333 9.47515 13.5333 8.83348 12.8916L3.40015 7.45825"
                    stroke="#3F4040"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
              
            </div>
          ) : (
            <ImageSkeleton width="200px" height="30px" rounded="30px" />
          )}
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
        <MenuItems className="absolute -right-20 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href={`/auth/profile/${user.id}`}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </MenuItem> 
              </div>*/}

          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer w-full text-start"
                  )}
                >
                  {t("Log Out")}
                  </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserNavDropDown;