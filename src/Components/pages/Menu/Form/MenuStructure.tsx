import React from 'react'
import { OrderSectionsForm, SectionForm } from '.'
import SectionHeader from './SectionHeader'


const MenuStructure = () => {
  return (
    <div className='sticky top-8 space-y-6'>
        <SectionHeader 
            name="Menu Structure"
        />
        <SectionForm />
        <OrderSectionsForm />
    </div>
  )
}

export default MenuStructure
