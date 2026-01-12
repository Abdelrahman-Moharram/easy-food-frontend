import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import { useDeleteSectionMutation, useGetSectionsListQuery, useSwapSectionMutation, useUpdateSectionMutation } from '../../../../redux/api/menusApi';
import { ListImageSkeletons } from '../../../ui/Common/ImageSkeleton';
import { useEffect, useRef, useState } from 'react';

const emptySectionForm = {id:undefined, name:undefined}

const OrderSections = () => {

  const {data:sections, isLoading}          = useGetSectionsListQuery({refetchOnMountOrArgChange:true, refetchOnReconnect:true})
  const [deleteSection]                     = useDeleteSectionMutation()
  const [swapSection]                       = useSwapSectionMutation()
  const [updateSection]                     = useUpdateSectionMutation()
  const [editedSection, setEditedSection]   = useState(emptySectionForm)
  const inputRef                            = useRef(null);



  // Handle Drag End
  const onDragEnd = (result) => {
    if (!result.destination) return;

    // We need the ID of the source and destination items.
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const sourceItem = sections[sourceIndex];
    const destinationItem = sections[destinationIndex];

    if (sourceItem?.id && destinationItem?.id) {
        // console.log(sourceItem, destinationItem);
        swapSection({ first_id: sourceItem.id, second_id: destinationItem.id });
    }
  };

  // Remove Section
  const removeSection = (id) => {
    deleteSection({section_id: id});
  };

  // ------------------------------------------------ //
  // edit logic 
  useEffect(() => {
    if (editedSection?.id) {
      inputRef.current?.focus();
    }
  }, [editedSection]);

  const handleBlur = () => {
    setEditedSection(emptySectionForm); // or save then close
  };

  
  const selectEditSection = (section:{id:string, name:string}) => {
    setEditedSection(section)
    
  }
  
  // Handle inline edit change with debouncing
  const handleEditChange = (e) => {
    const newValue = e.target.value;
    
    setEditedSection(prev=>({...prev, name:newValue}))
    const formData = new FormData();
    formData.append('name', newValue.trim());
    updateSection({ section_id: editedSection?.id, form: formData });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditedSection(emptySectionForm)
    }
  };
  
  // ------------------------------------------------ //

  return ( 
    <div className="min-h-full">
      <div className="bg-container p-6 shadow-lg border border-neutral-200 rounded-lg">
        <div className="mb-6">
          <p className="text-sm text-slate-500">Drag sections to reorder how they appear to customers.</p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className="space-y-3"
              >
                {sections?.map((section, index) => (
                  <Draggable key={section?.id} draggableId={section?.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-4 bg-container border rounded-lg transition-all duration-300 ease-in-out`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Drag Handle */}
                          <div {...provided.dragHandleProps} className="text-color/40 hover:text-color transition-all cursor-grab active:cursor-grabbing">
                            <GripVertical size={20} />
                          </div>
                          {
                            editedSection?.id === section?.id?
                              <input 
                                ref={inputRef}
                                className="border-0 border-b-2 border-primary/60 outline-none w-[80%]"
                                value={editedSection.name}
                                onChange={handleEditChange}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                name='section'
                              />
                            :
                              <span 
                                className="font-semibold text-slate-700 cursor-text hover:text-blue-600 transition-colors"
                                onClick={() => selectEditSection(section)}
                              >
                                {section?.name}
                              </span>
                          }
                        </div>

                        <button 
                          onClick={() => removeSection(section?.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
        
        {sections?.length === 0 && (
          isLoading?
            <ListImageSkeletons 
              height='60px'
              width='300px'
              number={4}
              rounded='10px'
              shadow
            />
          :
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 italic">
                No sections yet. Add one from the right panel.
            </div>
        )}
        </div>
    </div>
  );
};

export default OrderSections;