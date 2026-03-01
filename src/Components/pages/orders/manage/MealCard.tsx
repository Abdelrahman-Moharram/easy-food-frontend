import { MessageSquare } from 'lucide-react'

const MealCard = ({item}:{item:any}) => {
  return (
    <div className="p-3 rounded-lg shadow-sm border shadow-black/10">
        {/* Meal name + count + size */}
        <div className="flex items-start justify-between gap-2">
            <div>
            <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-neutral-900">
                {item.count}
                <span className="text-xs font-bold text-neutral-400 ml-0.5">x</span>
                </span>
                <span className="text-sm font-bold text-neutral-800">{item.meal.name}</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{item.meal.description}</p>
            </div>
            <span className="shrink-0 mt-0.5 px-2 py-1 bg-neutral-100 rounded-lg text-[10px] font-black text-neutral-500 uppercase tracking-tighter">
                {item.size.name}
            </span>
        </div>

        {/* Comment badge */}
        {item.comment && (
            <div className="mt-3 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
            <div className="p-1.5 bg-amber-200 rounded-lg shrink-0">
                <MessageSquare className="w-3 h-3 text-amber-800" />
            </div>
            <div>
                <div className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5">Note</div>
                <div className="text-xs text-amber-900 font-semibold leading-snug">{item.comment}</div>
            </div>
            </div>
        )}
        </div>
  )
}

export default MealCard
