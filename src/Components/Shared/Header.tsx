import { useAppSelector } from '../../redux/hooks';
import UserNavDropDown from "./UserDropDown";
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
      <div></div>      
    </header>
  );
};

export default Header;
