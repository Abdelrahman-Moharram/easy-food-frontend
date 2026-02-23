import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import OrderColumn from './OrderColumn';
import { useUpdateOrderStateMutation } from '../../../../redux/api/ordersApi';
import { toast } from 'react-toastify';

const STATES = ['Received', 'Preparing', 'Done', 'Closed'] as const;

const COLUMN_STYLES: Record<string, { headerColor: string; dotColor: string }> = {
  Received : { headerColor: 'bg-blue-50 text-blue-700',     dotColor: 'bg-blue-500'    },
  Preparing: { headerColor: 'bg-amber-50 text-amber-700',   dotColor: 'bg-amber-500'   },
  Done     : { headerColor: 'bg-emerald-50 text-emerald-700', dotColor: 'bg-emerald-500' },
  Closed   : { headerColor: 'bg-neutral-100 text-neutral-600', dotColor: 'bg-neutral-400' },
};

type OrdersMap = Record<string, any[]>;

interface Props {
  initialData: OrdersMap;
}

const OrderBoard: React.FC<Props> = ({ initialData }) => {
  const [board, setBoard] = useState<OrdersMap>(() => {
    const base: OrdersMap = { Received: [], Preparing: [], Done: [], Closed: [] };
    return { ...base, ...initialData };
  });

  const [updateOrderState] = useUpdateOrderStateMutation();

  useEffect(() => {
    const base: OrdersMap = { Received: [], Preparing: [], Done: [], Closed: [] };
    setBoard({ ...base, ...initialData });
  }, [initialData]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const from = source.droppableId;
    const to   = destination.droppableId;

    // Clone board
    const newBoard = { ...board };
    const sourceList = [...(newBoard[from] || [])];
    const destList   = from === to ? sourceList : [...(newBoard[to] || [])];

    const [movedOrder] = sourceList.splice(source.index, 1);

    // Update state label on the moved card
    const updatedOrder = { ...movedOrder, state: to };

    destList.splice(destination.index, 0, updatedOrder);

    newBoard[from] = sourceList;
    if (from !== to) newBoard[to] = destList;

    setBoard(newBoard); // Optimistic update

    try {
      await updateOrderState({ order_id: draggableId, state: to }).unwrap();
      toast.success(`Order #${movedOrder?.code || draggableId.slice(-4)} → ${to}`);
    } catch {
      toast.error('Failed to update order. Reverting…');
      const base: OrdersMap = { Received: [], Preparing: [], Done: [], Closed: [] };
      setBoard({ ...base, ...initialData });
    }
  };

  const totalOrders = STATES.reduce((sum, s) => sum + (board[s]?.length || 0), 0);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Board header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-neutral-900">Order Management</h1>
          <p className="text-sm text-neutral-500 mt-1 font-medium">
            Drag orders between columns to update their status
          </p>
        </div>
        <div className="px-4 py-2 bg-white border border-neutral-200 rounded-xl shadow-sm text-sm font-black text-neutral-500">
          {totalOrders} order{totalOrders !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATES.map(state => (
          <OrderColumn
            key={state}
            state={state}
            orders={board[state] || []}
            headerColor={COLUMN_STYLES[state].headerColor}
            dotColor={COLUMN_STYLES[state].dotColor}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default OrderBoard;
