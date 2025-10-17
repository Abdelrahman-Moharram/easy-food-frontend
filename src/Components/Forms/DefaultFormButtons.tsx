import React from 'react'
import Button from '../Common/Button'
import { Link } from 'react-router-dom'

interface Props{
    isLoading:boolean,
    cancelHref:string
}
const DefaultFormButtons = ({cancelHref, isLoading}:Props) => {
  return (
    <div className="grid grid-cols-2 gap-2">
        <Button 
            submit 
            variant='primary'
            disabled={isLoading}
            title={'Save'} 
            isLoading={isLoading} 
          />
        <Link 
          to={cancelHref} 
          className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
        >
          cancel
        </Link>
    </div>
  )
}

export default DefaultFormButtons
