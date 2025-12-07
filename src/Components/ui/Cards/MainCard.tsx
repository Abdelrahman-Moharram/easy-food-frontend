import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
interface Props{ 
  href        : string, 
  title       : string, 
  description : string, 
  icon        : React.ReactNode, 
  variant?    : 'red' | 'yellow' | 'default',
  message?    : string
}

const MainCard = ({ href, title, description, icon, message, variant='default' }:Props) => {
  const {t} = useTranslation()
  const variants = {
    'red'     : ' border-[#FF8282]',
    'yellow'  : ' border-[#FFBA8C]',
    'default' : ' border-conainer',
  }
  return (
    <Link
        to={href}
        className={"rounded-lg border-2 p-4 shadow-xs bg-container transition hover:shadow-lg sm:p-6 drop-shadow-md " + variants[variant]}
      >
        
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-sm bg-gray-100 p-1 text-white text-4xl">
              {icon}
            </span>
            <h3 className="mt-0.5 text-lg font-bold text-color">
              {title}
            </h3>
          </div>
          <div className="">
          {
              message?
              <span className='font-semibold'>
                {(message)}
              </span>
            :null
          }
          </div>
        </div>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-color/90">
          {description}
        </p>

        <Link to={href} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
          {t("Details")}

          <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
            &rarr;
          </span>
        </Link>
    </Link>
  )
}

export default MainCard
