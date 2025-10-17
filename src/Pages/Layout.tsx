import React, { Suspense, useEffect } from 'react'

import { useRetrieveUserQuery } from '../redux/features/authApiSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { Outlet } from 'react-router-dom'
import { setAuth } from '../redux/features/authSlice'

import { Setup } from '../Components/utils'
import Header from '../Components/Shared/Header'
import { useTranslation } from 'react-i18next'
import Footer from '../Components/Common/Footer'


const Layout = ({ children }:{children?:React.ReactNode}) => {
    const { i18n } = useTranslation();
    const { data } = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (data) {
            dispatch(setAuth(data))
        }
    }, [data, dispatch])
    const {isAuthenticated} = useAppSelector(state=>state.auth)
    
    return (
        
        <div >
            
            {
                !isAuthenticated? <>{children || <Outlet />}</>
                :
                <div>
                    <Setup />
                    <div className="h-screen flex flex-col">
                        <Header />
                        <div className="flex flex-1">
                            
                            <Suspense>
                                <div className={`w-full bg-background overflow-hidden`}>
                                    {/* show message appears here */}
                                    {children || <Outlet />}
                                </div>
                            </Suspense>
                        </div>
                    <Footer/>
                    </div>
                </div>
            }
        </div>
        
            
    )
}

export default Layout
