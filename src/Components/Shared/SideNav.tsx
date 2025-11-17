import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { MdBrandingWatermark } from "react-icons/md";
import { HomeIcon } from "../utils/Icons";
import { IsAllowedPermissionOrNull } from "../../Pages/Guards/IsAllowedPermission";
import SideNavDropDownItem from "./SideNavDropDownItem";
import { useTranslation } from "react-i18next";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";


// const 

export default function SideNav() {
    
    const {isAuthenticated}         = useAppSelector(state=>state.auth)
    const [isHovered, setIsHovered] = useState(false);
    const { t }                     = useTranslation();

    
    
    


    const sideNavLinks = [
        {
            title:t("Home Page"),
            innerLinks:[],
            icon:<HomeIcon />,
            baseKey:'',
            permission:''
        }, 
        {
            title:t("Categories"),
            innerLinks:[],
            icon:<BiSolidCategoryAlt />,
            baseKey:'categories',
            permission:''
        }, 
        {
            title:t("Brands"),
            innerLinks:[],
            icon:<MdBrandingWatermark />,
            baseKey:'brands',
            permission:''
        },      
        {
            title: t("Settings"),
            permission: "permissions.roles.view",
            baseKey: "settings",
            icon: <IoMdSettings className="text-xl" />,
            innerLinks: [
                { title: t("Roles"), link: "/settings/roles", permission: "permissions.roles.view" },
                { title: t("Users"), link: "/settings/users", permission: "permissions.users.view" },
            ]
        }         
    ]
    
    return (
        <div 
            className={`${isAuthenticated ? "  hover:w-[280px]":'-me-8'} relative transition-all duration-500overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={` ${isAuthenticated? 'w-[62px] pt-10 hover:w-[240px]' : 'w-0'} h-full fixed bg-primary transition-all duration-[400ms] rounded-e-md shadow-2xl text-white`}>
                <ul className="h-[90%] overflow-y-auto overflow-x-hidden py-5 px-1 space-y-1 ">
                    {/* <li className='mb-12 px-2'>
                        <Link
                            className="" 
                            to={'/'}
                        >
                            {
                                isHovered?
                                    <FullLogoDark />
                                :
                                    <FullLogoLight />
                            }
                                
                        </Link>
                    </li> */}
                    {
                        sideNavLinks?.map(item=>(
                            <IsAllowedPermissionOrNull
                                permission={item?.permission}
                                key={item.title}
                            >
                                <li id={item.title}>
                                    <SideNavDropDownItem 
                                        title={item?.title}
                                        innerLinks={item?.innerLinks}
                                        icon={item.icon}
                                        baseKey={item?.baseKey}
                                    />
                                </li>
                            </IsAllowedPermissionOrNull>
                        ))
                    }  
                    
                </ul>
                <ul className="px-1 overflow-x-hidden ">
                    <li className=''>
                        <SideNavDropDownItem 
                            title={'Logout'}
                            innerLinks={[]}
                            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15 12H3.62" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            }
                            baseKey={'auth/logout'}
                        />
                    </li>
                </ul>
                    
            </div>
        </div>
    );
}