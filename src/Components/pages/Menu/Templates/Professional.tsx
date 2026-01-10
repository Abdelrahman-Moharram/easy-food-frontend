import React from 'react'
import { useGetMenuDetailsQuery } from '../../../../redux/api/menusApi'

const Professional  = ({resturant_id}:{resturant_id:string}) => {
  const {data:menu}      = useGetMenuDetailsQuery({resturant_id:resturant_id}, {skip:!resturant_id, refetchOnMountOrArgChange:true, refetchOnReconnect:true})

  return (
    <div>
        {/* Paper Container */}
        <div className="bg-white min-h-[800px] shadow-2xl p-12 md:p-16 relative">
        
            {/* Decorative Border/Frame */}
            <div className="absolute inset-4 border border-double border-neutral-200 pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <h1 className="font-serif text-5xl font-bold tracking-wider text-neutral-900 mb-2 uppercase">
                    {menu?.name}
                </h1>
                <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase">{menu?.caption}</p>
            </div>

            {/* Menu Content */}
            <div className="space-y-12 max-w-2xl mx-auto relative z-10">
                {menu?.sections.length === 0 && (
                    <div className="text-center text-neutral-300 py-20 italic font-serif">
                        Menu is currently empty...
                    </div>
                )}

                {menu?.sections.map((section) => (
                <div key={section.name}>
                    {/* Section Title */}
                    <h2 className="font-serif text-2xl text-center text-neutral-800 uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2 mx-10">
                        {section.name}
                    </h2>

                    {/* Items Grid */}
                    <div className="space-y-6">
                    {section.meals.map((meal, idx) => (
                        <div key={idx} className="group">
                            <div className="flex items-end justify-between w-full">
                                {/* Name */}
                                <span className="font-bold text-neutral-800 text-lg whitespace-nowrap">
                                    {meal?.name}
                                </span>
                                
                                {/* Dotted Leader Line */}
                                <span className="flex-grow border-b-2 border-dotted border-neutral-300 mx-2 mb-1 opacity-50"></span>
                                
                                {/* Price */}
                                <span className="font-serif font-bold text-lg text-neutral-900">
                                    {meal?.price}
                                </span>
                            </div>
                            
                            {/* Description */}
                            <p className="text-sm text-neutral-500 italic mt-1 font-serif pr-12">
                                {meal?.description}
                            </p>
                        </div>
                    ))}
                    {section.meals.length === 0 && (
                        <p className="text-center text-xs text-neutral-300 uppercase tracking-widest">No items yet</p>
                    )}
                    </div>
                </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-20 text-center relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    {menu?.description}
                </p>
            </div>

        </div>
    </div>
  )
}

export default Professional
