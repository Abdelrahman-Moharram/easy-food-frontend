import React, { useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";

interface Props{
    title: string;
    children: React.ReactNode;
    className?: string;
}
const ToggledCard = ({title, children, className}:Props) => {
    const [show, setShow] = useState(true)
  return (
    <div key={title+show} className={className + ' bg-container rounded-lg w-full relative z-0 py-3 px-4 my-4  bg-card-100 transition-all '+(show?'max-h-fit':'max-h-[50px]')} >
        <div className='flex justify-between cursor-pointer' onClick={()=>setShow(!show)}>
            <h6 className='font-bold text-xl'>{title}</h6>
            <div className={' border-0 outline-0 transition-all ' + (!show?'rotate-[180deg]':'')}>
                <IoIosArrowUp />
            </div>
        </div>
        {show? children: null}
    </div>
  )
}

export default ToggledCard