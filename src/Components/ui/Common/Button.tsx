import React from 'react'
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
interface props{
    title       : string
    submit?     : boolean;
    isLoading?  : boolean;
    onClick?    : ()=>void;
    icon?       : React.ReactNode;
    className?  : string;
    disabled?   : boolean,
    variant     : 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'red' | 'blue' | 'blue-outline'
    iconRight?  : boolean
    fontBold?   : boolean
  }

  
  
  const Button = ({title, submit, isLoading, onClick, icon, variant, className, disabled=false, iconRight=false, fontBold=true}:props) => {
    
    const variantClassNames = {
      'primary'             : `${disabled?'bg-primary/50':'bg-primary'} hover:bg-primary-hover text-white focus-visible:outline-primary`,
      'primary-outline'     : `${disabled?'bg-transparent/50':'bg-transparent'} border-primary text-primary hover:bg-primary-hover focus-visible:outline-primary`,

      'secondary'           : `${disabled?'bg-secondary/50':'bg-secondary'} hover:bg-secondary-hover text-white focus-visible:outline-secondary`,
      'secondary-outline'   : `${disabled?'bg-transparent/50':'bg-transparent'} hover:bg-secondary-hover border-secondary focus-visible:outline-secondary`,
      
      'blue'                : `${disabled?'bg-blue-600/50':'bg-blue-600 hover:bg-blue-700'} text-white`,
      'blue-outline'        : `${disabled?'bg-slate/10':'bg-transparent hover:border-blue-700'} border border-blue-600 text-blue-600`,
      
      'red'                 : `${disabled?'bg-red-500/50':'bg-red-500'} border-red-500 text-white`,
      'red-outline'         : `${disabled?'bg-red-500/50':'bg-red-500'} hover:bg-transparent hover:text-black border-red-500 text-white`,

    }
  return (
    <button
        type={submit? "submit" : "button" }
        onClick={onClick}
        className={`w-full py-3 rounded-lg transition-all shadow-md min-w-[150px] ${variantClassNames[variant]} ${className}  ${fontBold?'font-bold':'font-medium'}`}
        disabled={disabled}
    >
      <div className='flex justify-center items-center content-center gap-1 text-center leading-6 font-[700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
        
        {
          isLoading?
            <Spinner sm />
          : 
            iconRight?
              <>
                {icon}
                {title}
              </>
            :
              <>
                {title}
                {icon} 
              </>
        }
      </div>
      
    </button>
  )
}


interface LinkProps{
    title     : string
    submit?   : boolean;
    isLoading?: boolean;
    href?     : string;
    icon?     : React.ReactNode;
    className?: string;
    disabled? : boolean,
    variant   : 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'red'
    iconRight?: boolean
  }


export const A = ({title, submit, isLoading, icon, variant, href, className, disabled=false, iconRight=false}:LinkProps) =>{
  const variantClassNames = {
      'primary'             : `${disabled?'bg-primary/50':'bg-primary'} hover:bg-primary-hover text-white focus-visible:outline-primary`,
      'secondary'           : `${disabled?'bg-secondary/50':'bg-secondary'} hover:bg-secondary-hover text-white focus-visible:outline-secondary`,
      'primary-outline'     : `${disabled?'bg-transparent/50':'bg-transparent'} border-primary text-primary hover:bg-primary-hover focus-visible:outline-primary`,
      'secondary-outline'   : `${disabled?'bg-transparent/50':'bg-transparent'} hover:bg-secondary-hover border-secondary focus-visible:outline-secondary`,
      
      'red'                 : `${disabled?'bg-red-500/50':'bg-red-500'} border-red-500 text-white`,
      'red-outline'         : `${disabled?'bg-red-500/50':'bg-red-500'} hover:bg-transparent hover:text-black border-red-500 text-white`,

    }
  return (
    <Link
        type={submit? "submit" : "button" }
        to={href}
        className={`w-full py-2 rounded-xl border transition-all  min-w-[150px] ${variantClassNames[variant]} ${className}`}
    >
      <div className='flex justify-center items-center content-center gap-1 text-center leading-6 font-[700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
        
        {
          isLoading?
            <Spinner sm />
          : 
            iconRight?
              <>
                {icon}
                {title}
              </>
            :
              <>
                {title}
                {icon} 
              </>
        }
      </div>
      
    </Link>
  )
}

export default Button
