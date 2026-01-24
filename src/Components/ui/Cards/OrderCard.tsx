import React from 'react';
import { Plus } from 'lucide-react';

interface PriceVariant {
  id: string;
  name: string;
  price: number;
}

interface OrderCardProps {
  id: string;
  name: string;
  description?: string;
  prices: PriceVariant[];
  onAdd: (variantId: string) => void;
  selectedVariantId?: string;
  onSelectVariant: (variantId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  name,
  description,
  prices,
  onAdd,
  selectedVariantId,
  onSelectVariant,
}) => {
  const selectedVariant = prices.find((v) => v.id === selectedVariantId) || prices[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-neutral-800">{name}</h3>
          <span className="text-primary font-bold text-lg">
            ${selectedVariant?.price || 0}
          </span>
        </div>
        
        {description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4 italic">
            {description}
          </p>
        )}

        {prices.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {prices.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onSelectVariant(variant.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedVariantId === variant.id
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-neutral-50 border-t border-neutral-100">
        <button
          onClick={() => onAdd(selectedVariant?.id || '')}
          disabled={!selectedVariant}
          className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          <Plus size={18} />
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
