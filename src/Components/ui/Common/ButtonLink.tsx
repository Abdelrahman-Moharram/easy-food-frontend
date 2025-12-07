import React from 'react'
import { Link } from 'react-router-dom';

interface props{
    children: React.ReactNode;
    href: string
}
const ButtonLink = ({children, href}:props) => {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 w-fit rounded border bg-secondry transition-all hover:bg-primary-hover px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500"
    >
    {children}
    </Link>
  )
}

export default ButtonLink
