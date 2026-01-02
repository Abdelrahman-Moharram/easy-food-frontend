import React from 'react'
import { MainCard } from '../../Components/ui/Cards'
import { MenuIcon } from 'lucide-react'

const Menu = () => {
  return (
    <div className='bg-slate-500'>
      <div className='flex justify-between'>
        <MainCard 
          title='test'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi minima, eaque tenetur soluta obcaecati, fuga perferendis, eligendi aliquid labore molestias amet qui mollitia! Tempore fugit ipsam iusto! Libero, nostrum.'
          href='/test'
          icon={<MenuIcon />}
          variant='default'
          message='test message'
        />
        <MainCard 
          title='test'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi minima, eaque tenetur soluta obcaecati, fuga perferendis, eligendi aliquid labore molestias amet qui mollitia! Tempore fugit ipsam iusto! Libero, nostrum.'
          href='/test'
          icon={<MenuIcon />}
          variant='default'
          message='test message'
        />
        <MainCard 
          title='test'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi minima, eaque tenetur soluta obcaecati, fuga perferendis, eligendi aliquid labore molestias amet qui mollitia! Tempore fugit ipsam iusto! Libero, nostrum.'
          href='/test'
          icon={<MenuIcon />}
          variant='default'
          message='test message'
        />
        <MainCard 
          title='test'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi minima, eaque tenetur soluta obcaecati, fuga perferendis, eligendi aliquid labore molestias amet qui mollitia! Tempore fugit ipsam iusto! Libero, nostrum.'
          href='/test'
          icon={<MenuIcon className='bg-primary ' />}
          variant='default'
          message='test message'
        />
        
      </div>
    </div>
  )
}

export default Menu
