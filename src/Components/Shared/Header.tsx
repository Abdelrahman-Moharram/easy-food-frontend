import { FullLogoDark } from "../utils/Icons";
import { useAppSelector } from '../../redux/hooks';
import UserNavDropDown from "./UserDropDown";
import LanguageSwitcher from "../Common/LanguageSwitcher";
import NavBar from "./NavBar";

const Header = () => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <header className="flex items-center justify-between">

      {
          isAuthenticated ?
            <div className="">
              <UserNavDropDown user={user} />
            </div>
          :
            null
      }
      <NavBar/>
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-40 h-30"
      />


      
    </header>
  );
};

export default Header;
