
import MenuSectionsList from '../../Components/pages/orders/create/MenuSectionsList';
import Cart from '../../Components/pages/orders/create/Cart';



const Orders = () => {
    

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <MenuSectionsList />


        <Cart />

        
      </div>
    </div>
  );
};

export default Orders;

