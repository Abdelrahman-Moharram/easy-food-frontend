import React from 'react'
import { Link } from 'react-router-dom';

interface props {
    href:string;
    title:string
    
}
const CardBadge = ({href, title}:props) => {
  return (
    <Link to={href}>
        <span
            className="whitespace-nowrap bg-primary hover:bg-primary-hover text-white px-2 rounded-md py-1 text-xs font-medium"
        >
            {title}
        </span>
    </Link>
  )
}

export default CardBadge
