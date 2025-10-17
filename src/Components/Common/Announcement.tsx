import React, { useState } from 'react'

interface Props{
    children:React.ReactNode
}
const Announcement = ({children}:Props) => {
    const [open, setOpen] = useState(true)

    const handleOpen = () =>{
        setOpen(!open)
    }    
  return (
    <div className={`inset-x-0 bottom-0 z-auto p-4 ${!open?'hidden':''}`}>
        <div
            className="flex items-center justify-between rounded-md border border-card/90 bg-card px-4 py-2 text-color  shadow-md"
        >
            {children}

            <button
                type="button"
                aria-label="Dismiss"
                className="rounded border p-1.5 transition-colors hover:bg-gray-50"
                onClick={handleOpen}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Announcement
