
import React from 'react'
import { Link } from 'react-router-dom'

interface itemType{
    label:string
    href:string
    icon?:React.ReactNode | string
    icon_str?: string
    image?:string
    description?: string
    color?:string,
    value?:string
  }

interface props{
    item:itemType;
    preLink: string
}
const SmallCard = ({item, preLink}:props) => {   
  return (
    <Link
      key={item.href}
      className={`block rounded-xl p-5 py-7 drop-shadow-md transition-all ${preLink?'hover:scale-105':' cursor-default'} bg-primary/20 `}
      to={`/${preLink}/`+item.href}
    >
      <div className="flex justify-between">
        <div className={`flex items-center gap-3 ${item.color}`}>
          <span className="inline-block rounded-lg">
          {
            item.image?
              <img
                height={40}
                width={40}
                src={import.meta.env.VITE_BASE_URL + item.image} 
                alt={item.label} 
              />
            :
            typeof(item.icon)=='string' ?
              <img
                height={40}
                width={40}
                src={import.meta.env.VITE_BASE_URL + item?.icon} 
                alt={item.label} 
              />
            :
              item.icon

          }
          </span>
          <h2 className="font-bold">{item.label}</h2>
        </div>  

        <div className="font-bold text-primary">{item?.value}</div>

      </div>
      

      {/* <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
        {item.description}
      </p> */}
    </Link>
  )
}

export default SmallCard