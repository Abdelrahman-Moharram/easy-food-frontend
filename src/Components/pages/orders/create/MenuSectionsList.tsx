import React from 'react'
import MealCard from './MealCard'

const MenuSectionsList = ({sections}) => {
    console.log(sections);
    
  return (
    <div className="space-y-12 mt-8">
        {sections?.map((section: any) => (
            <div key={section.id} className="space-y-6">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-neutral-800">{section.name}</h2>
                <div className="h-px flex-1 bg-neutral-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {section.meals.map((meal: any) => (
                    <MealCard 
                        key={meal.id}
                        id={meal.id}
                        name={meal.name}
                        description={meal.description}
                        prices={meal.prices}
                    />
                ))}
            </div>
            </div>
        ))}
    </div>
  )
}

export default MenuSectionsList
