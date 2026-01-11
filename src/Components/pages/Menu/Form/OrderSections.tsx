
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import { useDeleteSectionMutation, useGetSectionsListQuery, useSwapSectionMutation } from '../../../../redux/api/menusApi';
import { useEffect, useState } from 'react';

const OrderSections = () => {
  const {data, isLoading}                   = useGetSectionsListQuery({refetchOnMountOrArgChange:true, refetchOnReconnect:true})
  const [deleteSection]                     = useDeleteSectionMutation()
  const [swapSection]                       = useSwapSectionMutation()
  const [localSections, setLocalSections]   = useState([]);
  const [deletingIds, setDeletingIds]       = useState(new Set());

  useEffect(() => {
    if (data) {
      setLocalSections(data);
    }
  }, [data]);

  // Handle Drag End
  const onDragEnd = (result) => {
    if (!result.destination) return;

    // We need the ID of the source and destination items.
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const sourceItem = localSections[sourceIndex];
    const destinationItem = localSections[destinationIndex];

    // Optimistic Update
    const newSections = Array.from(localSections);
    const [reorderedItem] = newSections.splice(sourceIndex, 1);
    newSections.splice(destinationIndex, 0, reorderedItem);
    setLocalSections(newSections);

    if (sourceItem?.id && destinationItem?.id) {
        // console.log(sourceItem, destinationItem);
        swapSection({ first_id: sourceItem.id, second_id: destinationItem.id });
    }
  };

  // Remove Section
  const removeSection = (id) => {
    // Add to deleting set to trigger animation
    setDeletingIds(prev => new Set(prev).add(id));
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      // Optimistic Update
      setLocalSections(prev => prev.filter(section => section.id !== id));
      
      // Remove from deleting set
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      
      deleteSection({section_id: id});
    }, 300);
  };
  return (

    <div className="min-h-full">
      <div className="bg-white p-6 shadow-lg border border-neutral-200 rounded-lg">
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
                {localSections?.map((section, index) => (
                    <Draggable key={section?.id} draggableId={section?.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                            className={`flex items-center justify-between p-4 bg-white border rounded-lg transition-all duration-300 ease-in-out ${
                                deletingIds.has(section?.id) 
                                  ? "opacity-0 scale-95 max-h-0 overflow-hidden py-0 my-0" 
                                  : snapshot.isDragging 
                                    ? "opacity-100 scale-100 shadow-xl border-blue-400 ring-2 ring-blue-50 z-10" 
                                    : "opacity-100 scale-100 border-slate-200"
                            }`}
                        >
                        <div className="flex items-center gap-4">
                            {/* Drag Handle */}
                            <div {...provided.dragHandleProps} className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing">
                            <GripVertical size={20} />
                            </div>
                            <span className="font-semibold text-slate-700">{section?.name}</span>
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
        
        {localSections?.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 italic">
                No sections yet. Add one from the right panel.
            </div>
        )}
        </div>
    </div>
  );
};

export default OrderSections;