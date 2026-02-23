import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { ShoppingBag, CreditCard, Banknote, Copy, Check, Clock } from 'lucide-react';
import classNames from 'classnames';
import MealCard from './MealCard';
import { format } from 'date-fns';

const STATE_COLORS: Record<string, string> = {
  'Received' : 'bg-blue-50 text-blue-700 border-blue-200',
  'Preparing': 'bg-amber-50 text-amber-700 border-amber-200',
  'Done'     : 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Closed'   : 'bg-neutral-100 text-neutral-500 border-neutral-200',
};

interface OrderCardProps {
  order: any;
  index: number;
}


const CopyableId: React.FC<{ id: string }> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent drag from triggering
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 mt-0.5 text-[11px] font-mono text-neutral-400 hover:text-primary-600 transition-colors group"
      title={id}
    >
      id: <span>{id?.slice(0, 12)}…</span>
      {copied
        ? <Check className="w-3 h-3 text-emerald-500" />
        : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    </button>
  );
};

const OrderCard: React.FC<OrderCardProps> = ({ order, index }) => {
  return (
    <Draggable draggableId={order?.id?.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classNames(
            'mb-4 p-5 bg-white rounded-2xl border transition-all duration-200 select-none',
            snapshot.isDragging
              ? 'shadow-2xl ring-2 ring-primary-500 scale-[1.02] rotate-1'
              : 'shadow-sm border-neutral-200 hover:shadow-md hover:border-neutral-300'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <div className="font-black text-neutral-900 text-base leading-tight">
                  #{order?.code || order?.id?.toString().slice(-4)}
                </div>
                <CopyableId id={order?.id} />
                {order?.created_at && (
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>{format(new Date(order.created_at), 'dd MMM · HH:mm')}</span>
                  </div>
                )}
              </div>
            </div>
            <span className={classNames(
              'px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-widest border',
              STATE_COLORS[order?.state]
            )}>
              {order?.state}
            </span>
          </div>

          {/* Meals */}
          <div className="space-y-5 mb-5">
            {order?.meals?.map((item: any, idx: number) => (
              <MealCard 
                item={item}
                key={idx}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 justify-between">
            <div className="text-[10px] text-neutral-400 font-semibold ml-auto">
              by {order?.created_by}
            </div>

            <div className={classNames(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black',
              order?.payment_method === 'Visa'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-emerald-50 text-emerald-700'
            )}>
              {order?.payment_method === 'Visa'
                ? <CreditCard className="w-3.5 h-3.5" />
                : <Banknote className="w-3.5 h-3.5" />
              }
              {order?.payment_method}
            </div>
            
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default OrderCard;
