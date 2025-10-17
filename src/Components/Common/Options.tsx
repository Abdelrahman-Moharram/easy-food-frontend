import React, { useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'

const Options = ({children}:{children:React.ReactNode}) => {
    const [open, setOpen] = useState(false)
  return (
    <div className="relative" onClick={()=>setOpen(!open)}>
        <button type='button' className="bg-container rounded-full p-1 shadow-md ">
            <SlOptionsVertical />
        </button>
        {
            open?
                <div className='absolute right-0 w-max space-y-2 py-2 bg-container rounded-lg'>
                    {children}
                </div>
            :null
        }
    </div>

  )
}

export default Options
