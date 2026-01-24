import React, { useState, useMemo } from 'react';
import { useGetMenuDetailsQuery } from '../../redux/api/menusApi';
import { PageHeader } from '../../Components/ui/Shared';
import OrderCard from '../../Components/ui/Cards/OrderCard';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface CartItem {
  id: string; // unique cart id (mealId-variantId)
  mealId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
}

const Orders = () => {
  const { data: menu, isLoading } = useGetMenuDetailsQuery({ refetchOnMountOrArgChange: true });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // Sync initial variants if none selected
  useMemo(() => {
    if (menu?.sections) {
      const initial: Record<string, string> = {};
      menu.sections.forEach((section: any) => {
        section.meals.forEach((meal: any) => {
          if (meal.prices?.length > 0 && !selectedVariants[meal.id]) {
            initial[meal.id] = meal.prices[0].id;
          }
        });
      });
      if (Object.keys(initial).length > 0) {
        setSelectedVariants(prev => ({ ...initial, ...prev }));
      }
    }
  }, [menu]);

  const addToCart = (meal: any, variantId: string) => {
    const variant = meal.prices.find((v: any) => v.id === variantId);
    if (!variant) return;

    const cartId = `${meal.id}-${variantId}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartId);
      if (existing) {
        return prev.map(item => 
          item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: cartId,
        mealId: meal.id,
        variantId,
        name: meal.name,
        variantName: variant.name,
        price: variant.price,
        quantity: 1
      }];
    });
    toast.success(`Added ${meal.name} to cart`);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    console.log('Order Placed:', cart);
    toast.success('Order placed successfully!');
    setCart([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <PageHeader 
            title="Create Order"
            subtitle={`Explore our menu and select your favorites from "${menu?.name || 'Menu'}"`}
            searchPlaceholder="Search items..."
          />

          <div className="space-y-12 mt-8">
            {menu?.sections.map((section: any) => (
              <div key={section.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-neutral-800">{section.name}</h2>
                  <div className="h-px flex-1 bg-neutral-200"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.meals.map((meal: any) => (
                    <OrderCard 
                      key={meal.id}
                      id={meal.id}
                      name={meal.name}
                      description={meal.description}
                      prices={meal.prices}
                      selectedVariantId={selectedVariants[meal.id]}
                      onSelectVariant={(vId) => setSelectedVariants(prev => ({ ...prev, [meal.id]: vId }))}
                      onAdd={(vId) => addToCart(meal, vId)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Cart */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-6 sticky top-10">
            <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
              <ShoppingCart size={24} className="text-primary" />
              Your Order
            </h3>

            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <div className="bg-neutral-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={24} className="text-neutral-300" />
                </div>
                <p className="text-neutral-400">Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-neutral-400 capitalize">{item.variantName}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-neutral-100 p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-neutral-50 text-neutral-400 rounded-md transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between items-end">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-neutral-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                        <p className="font-bold text-neutral-800">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-dashed border-neutral-200">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-neutral-900 pt-2">
                    <span>Total</span>
                    <span className="text-primary">${total}</span>
                  </div>
                  
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] mt-4 shadow-lg shadow-primary/20"
                  >
                    Place Order
                    <CheckCircle2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

