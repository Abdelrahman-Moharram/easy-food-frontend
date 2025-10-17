
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

interface TabType{
    title:string,
    href:string,
    icon?:React.ReactNode,
}
interface Props{
    tabs: TabType[]
}

const Tabs = ({tabs}:Props) => {
  const [searchParams, setSParams]      = useSearchParams()
  const tabName                         = searchParams.get('tab')
  const changeTab = (value:string) =>{
    searchParams.set('tab', value)
    setSParams(searchParams)
  }
  return (
    <div>
        <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>

            <select id="Tab" onChange={(e)=>changeTab(e.target.value)} className="w-full rounded-md border-gray-200">
                {
                    tabs?.map(tab=>(
                        <option value={tab.href} key={tab.href}>{tab.title}</option>
                    ))
                }
            </select>
        </div>

        <div className="hidden sm:block">
            <div className="flex gap-5">
                {
                    tabs.map(tab=>(
                        <Link
                            to={`?tab=${tab?.href}`}
                            key={tab?.href}
                            className={`rounded-xl w-full p-3 font-semibold border-2 flex bg-container justify-between items-center ${tabName === tab.href?'border-primary':''}`}
                        >
                            <div>
                                {tab?.icon} {tab?.title}  
                            </div>
                            <div className="">
                                {
                                    tabName === tab.href? 
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#00A69C"/>
                                            <circle cx="11.9992" cy="12.0002" r="4.8" fill="#00A69C"/>
                                        </svg>

                                    :
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#00A69C"/>
                                        </svg>
                                }
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}


interface StepTabType{
    title:string,
    icon?:React.ReactNode,
}

export const StepsTabs = ({tabs}:{tabs:StepTabType[]}) =>{
    const [searchParams]        = useSearchParams()
    const step                  = searchParams.get('step')
    
    
    return(
        <div className="flex gap-5 bg-[#1C3A6B] rounded-t-xl overflow-hidden">
        {
            tabs.map((tab, idx)=>(
                <div
                    // to={`?step=${idx+1}`}
                    key={idx}
                    className={`w-full py-5 gap-4 font-semibold flex text-white justify-center items-center ${step == (idx+1)?.toString()? 'border-b-4 border-primary bg-secondary':''}`}
                >
                    {tab?.icon} {tab?.title}  
                </div>
            ))
        }
        </div>
    )

    
}


export default Tabs