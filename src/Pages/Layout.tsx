import React, { Suspense, useEffect } from 'react'

import { useRetrieveUserQuery } from '../redux/features/authApiSlice'
import { useAppDispatch } from '../redux/hooks'
import { setAuth } from '../redux/features/authSlice'

import SideNav from '../Components/ui/Shared/SideNav'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


const Layout = ({ children }:{children?:React.ReactNode}) => {
    const { data } = useRetrieveUserQuery()
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (data) {
            dispatch(setAuth(data))
        }
    }, [data, dispatch])

    return (
        <main dir={i18n.language == "en" ? "ltr" : "rtl"} className=' light' >
            <div className='flex gap-8 bg-background'>
                <SideNav />
                <div className="px-0 w-full min-h-[calc(100vh-78px)] mx-auto overflow-hidden">
                    <div className=" p-10 rounded-tr-2xl mx-8">
                        <Suspense>
                            {children || <Outlet />}
                        </Suspense>
                    </div>
                </div>
            </div>    
        </main>
    )
}

export default Layout