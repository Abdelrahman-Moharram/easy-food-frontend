import { useGetMenuDetailsQuery, useSwapMenuMealMutation } from '../../../../redux/api/menusApi'
import React from 'react'
import EditableField from '../../../ui/Forms/EditableField'
import { useMealActions } from '../Hooks/useMealActions'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { GripVertical, Trash2, Plus, X } from 'lucide-react'

const Professional  = () => {
  const {data:menu}      = useGetMenuDetailsQuery({refetchOnMountOrArgChange:true, refetchOnReconnect:true})
  const [swapMeal]       = useSwapMenuMealMutation()

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) return; // Assuming no moving between sections for now
    if (source.index === destination.index) return;

    // Find the section
    const sectionIndex = parseInt(source.droppableId.split('-')[1]);
    const section = menu?.sections[sectionIndex];
    
    if (section) {
        const sourceItem = section.meals[source.index];
        const destinationItem = section.meals[destination.index];
        
        if (sourceItem && destinationItem) {
            swapMeal({ first_id: sourceItem.id, second_id: destinationItem.id })
        }
    }
  };

  return (
    <div>
        {/* Paper Container */}
        <div className="bg-container min-h-[800px] shadow-2xl p-12 md:p-16 relative">
        
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
                
                <DragDropContext onDragEnd={onDragEnd}>
                {menu?.sections.map((section, sIdx) => (
                <div key={section.name}>
                    {/* Section Title */}
                    <h2 className="font-serif text-2xl text-center text-neutral-800 uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2 mx-10">
                        {section.name}
                    </h2>

                    {/* Items Grid */}
                    <Droppable droppableId={`section-${sIdx}`}>
                    {(provided) => (
                    <div 
                        className="space-y-6"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    {section.meals.map((meal, idx) => (
                        <Draggable key={meal.id} draggableId={meal.id} index={idx}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={snapshot.isDragging ? "opacity-50" : ""}
                            >
                                <ProfessionalMealItem 
                                    meal={meal} 
                                    dragHandleProps={provided.dragHandleProps}
                                />
                            </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    {section.meals.length === 0 && (
                        <p className="text-center text-xs text-neutral-300 uppercase tracking-widest">No items yet</p>
                    )}
                    </div>
                    )}
                    </Droppable>
                </div>
                ))}
                </DragDropContext>
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



const ProfessionalMealItem = ({ meal, dragHandleProps }: { meal: any, dragHandleProps?: any }) => {
    const { updateMealField, deleteMeal, updatePriceVariant, addPriceVariant, deletePriceVariant } = useMealActions(meal)

    return (
        <div className="group mb-6 relative">
            {/* Hover Actions */}
            <div className="absolute -left-10 top-0 bottom-0 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div {...dragHandleProps} className="cursor-grab text-neutral-300 hover:text-neutral-600">
                    <GripVertical size={16} />
                </div>
                <button 
                    onClick={deleteMeal}
                    className="cursor-pointer text-neutral-300 hover:text-red-500"
                    title="Delete Meal"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex items-end justify-between w-full">
                {/* Name */}
                <EditableField 
                    value={meal?.name}
                    onSave={(val) => updateMealField('name', val)}
                    className="font-bold text-neutral-800 text-lg whitespace-nowrap cursor-text hover:text-neutral-500 transition-colors"
                    inputClassName="font-bold text-neutral-800 text-lg w-full bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none"
                    placeholder="Meal Name"
                />
                
                {/* Dotted Leader Line */}
                <span className="flex-grow border-b-2 border-dotted border-neutral-300 mx-2 mb-1 opacity-50"></span>
                
                {/* Multi-Price or Single Price */}
                {meal?.prices?.length > 0 ? (
                    <div className="flex items-baseline justify-end flex-wrap gap-y-2">
                        {meal.prices.map((price: any, idx: number) => (
                            <div key={idx} className="flex items-baseline gap-1 group/price relative">
                                <EditableField 
                                    value={price?.name}
                                    onSave={(val) => {
                                        if (price.id) {
                                            updatePriceVariant(price.id, 'name', val);
                                        } else {
                                            // Handle case where it doesn't have an ID yet (newly added)
                                            const newPrices = [...meal.prices];
                                            newPrices[idx] = { ...newPrices[idx], name: val };
                                            updateMealField('prices', newPrices);
                                        }
                                    }}
                                    className="text-[9px] uppercase font-sans tracking-widest text-neutral-400 cursor-text hover:text-neutral-600"
                                    inputClassName="text-[9px] uppercase font-sans tracking-widest text-neutral-400 w-10 text-right bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none"
                                    placeholder="Size"
                                />
                                <EditableField 
                                    value={price?.price}
                                    onSave={(val) => {
                                        if (price.id) {
                                            updatePriceVariant(price.id, 'price', val);
                                        } else {
                                            // Handle case where it doesn't have an ID yet (newly added)
                                            const newPrices = [...meal.prices];
                                            newPrices[idx] = { ...newPrices[idx], price: val };
                                            updateMealField('prices', newPrices);
                                        }
                                    }}
                                    className="font-serif font-bold text-xs text-neutral-900 cursor-text hover:text-neutral-500 transition-colors"
                                    inputClassName="font-serif font-bold text-xs text-neutral-900 w-12 text-right bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none"
                                    placeholder="Price"
                                />
                                
                                {/* Individual Price Delete Button */}
                                <button 
                                    onClick={() => deletePriceVariant(idx)}
                                    className="opacity-0 group-hover/price:opacity-100 transition-opacity ml-1 text-neutral-300 hover:text-red-500"
                                    title="Remove Price"
                                >
                                    <X size={10} />
                                </button>

                                {idx < meal.prices.length - 1 && (
                                    <span className="text-[10px] text-neutral-300 font-serif ml-1">/</span>
                                )}
                            </div>
                        ))}
                        
                        {/* Add Price Button */}
                        <button 
                            onClick={addPriceVariant}
                            className="ml-2 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition-colors"
                            title="Add Price Option"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={addPriceVariant}
                        className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 hover:text-neutral-800 flex items-center gap-1"
                    >
                        <Plus size={10} /> Add Price
                    </button>
                )}
            </div>
            
            {/* Description */}
            <div className="pr-12">
            <EditableField 
                value={meal?.description}
                onSave={(val) => updateMealField('description', val)}
                className="text-sm text-neutral-500 italic mt-1 font-serif cursor-text hover:text-neutral-700 transition-colors block"
                inputClassName="text-sm text-neutral-500 italic mt-1 font-serif w-full bg-transparent border-b border-neutral-300 focus:border-neutral-800 outline-none resize-none"
                placeholder="Description"
                as="textarea"
                rows={2}
            />
            </div>
        </div>
    )
}

export default Professional
