import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import { useDeleteSectionMutation, useGetSectionsListQuery } from '../../../../redux/api/menusApi';

const OrderSections = () => {
  const {data:sections, isLoading}  = useGetSectionsListQuery({refetchOnMountOrArgChange:true, refetchOnReconnect:true})
  const [deleteSection]             = useDeleteSectionMutation()
  // Handle Drag End
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };
  


  // Remove Section
  const removeSection = (id) => {
    setSections(sections?.filter((s) => s.id !== id));
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
                {sections?.map((section, index) => (
                    <Draggable key={section?.id} draggableId={section?.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-4 bg-white border rounded-lg transition-all ${
                            snapshot.isDragging ? "shadow-lg border-blue-400 ring-2 ring-blue-50" : "border-slate-200"
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
        
        {sections?.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 italic">
            No sections yet. Add one from the right panel.
            </div>
        )}
        </div>
    </div>
  );
};

export default OrderSections;