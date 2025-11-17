'use client'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IsAllowedPermissionOrNull } from '../../Pages/Guards/IsAllowedPermission'

interface innerLinkType{
    title:string,
    link:string,
    icon?:React.ReactNode
    permission:string
}
interface Props{
    title: string,
    icon:React.ReactNode,
    innerLinks?: innerLinkType[] ,
    baseKey:string
}
const SideNavDropDownItem = ({title, icon, innerLinks, baseKey}:Props) => {
    const {pathname} = useLocation()  
      
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className={"flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:text-primary hover:bg-secondary transition-all "+(baseKey === pathname.split('/')[1]?'text-primary bg-secondary':'')}
            >
                {
                    innerLinks?.length?
                        <>
                            <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap"> 
                                <div className="w-[24px] text-center hover:text-primary">
                                    {icon}
                                </div> 
                                <span className='mx-4 whitespace-nowrap'>{title}</span> 
                            </div>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            </span>
                        </>
                    :
                        <Link to={"/"+baseKey} className="flex whitespace-nowrap items-center gap-2 text-sm font-medium "> 
                            <div className="hover:text-primary text-lg ms-0.5">
                                {icon}
                            </div> 
                            <span className='mx-6'>{title}</span> 
                        </Link>
                
                }
                


            </summary>
            {
                innerLinks?.length?
                    <ul className="mt-2 space-y-1 px-5">
                        {
                            innerLinks.map((link, idx)=>(
                                <IsAllowedPermissionOrNull
                                    permission={link.permission}
                                    key={`${idx} ${link}`}
                                >
                                    <li key={idx}>
                                        <div className="px-10">
                                            <Link
                                                to={link.link}
                                                className={`flex whitespace-nowrap items-center gap-2 rounded-lg py-2 px-2 text-xs font-medium hover:text-primary hover:bg-secondary transition-all ${pathname == link.link?'text-primary bg-secondary':''}`}
                                            >
                                                {link?.icon}
                                                {link.title}
                                            </Link>
                                        </div>
                                    </li>      
                                </IsAllowedPermissionOrNull>
                            ))
                        }                  
                    </ul>
                :null
            }
        </details>
    )
}

export default SideNavDropDownItem