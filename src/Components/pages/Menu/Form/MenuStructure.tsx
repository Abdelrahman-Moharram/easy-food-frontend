import React from 'react'
import { OrderSectionsForm, SectionForm } from '.'
import SectionHeader from './SectionHeader'


const MenuStructure = ({resturant_id}:{resturant_id:string}) => {
  return (
    <div className='sticky top-8 space-y-6'>
        <SectionHeader 
            name="Menu Structure"
        />
        <SectionForm 
            resturant_id={resturant_id}
        />
        <OrderSectionsForm />
    </div>
  )
}

export default MenuStructure
