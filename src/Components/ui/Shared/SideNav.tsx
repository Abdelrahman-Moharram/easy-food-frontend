import { IoLogOut } from "react-icons/io5";
import { HomeIcon } from "../../utils/Icons";
// import { IsAllowedPermissionOrNull } from "../../../Pages/Guards/IsAllowedPermission";
import SideNavDropDownItem from "./SideNavDropDownItem";
import { useTranslation } from "react-i18next";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCodeBranch } from "react-icons/fa";



// const 

export default function SideNav() {
    
    const { t }        = useTranslation();

    const sideNavLinks = [
        {
            title:t("Home Page"),
            icon:<HomeIcon />,
            path:'',
        },       
        {
            title:t("Branches"),
            icon:<FaCodeBranch />,
            path:'/branches',
        },              
        {
            title:t("Menu"),
            icon:<BiSolidFoodMenu />,
            path:'/menus',
        },              
    ]
    
    return (
        <aside className='h-full overflow-y-auto flex-shrink-0'>
            <div className={`h-full bg-primary rounded-lg shadow-2xl text-white `}>
                <ul className="h-[90%] overflow-y-auto overflow-x-hidden py-5 px-1 space-y-5 ">
                    {
                        sideNavLinks?.map(item=>(
                            <li id={item.title}>
                                <SideNavDropDownItem 
                                    title={item?.title}
                                    icon={item.icon}
                                    path={item?.path}
                                />
                            </li>
                        ))
                    }  
                </ul>
                <ul className=" ">
                    <li className=''>
                        <SideNavDropDownItem 
                            title={'Logout'}
                            icon={<IoLogOut className="text-xl" />}
                            path={'/auth/logout'}
                        />
                    </li>
                </ul>
                    
            </div>
        </aside>
    );
}