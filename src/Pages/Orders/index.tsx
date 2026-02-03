import { useGetMenuDetailsQuery } from '../../redux/api/menusApi';

import MenuSectionsList from '../../Components/pages/orders/create/MenuSectionsList';
import Cart from '../../Components/pages/orders/create/Cart';
import { PageHeader } from '../../Components/ui/Shared';



const Orders = () => {
  const { data: menu } = useGetMenuDetailsQuery(undefined, { refetchOnMountOrArgChange: true });
    

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <PageHeader 
            title="Create Order"
            subtitle={`Explore our menu and select your favorites from "${menu?.name || 'Menu'}"`}
            searchPlaceholder="Search items..."
          />

          <MenuSectionsList 
            sections={menu?.sections}
          />
          
        </div>


        <Cart />

        
      </div>
    </div>
  );
};

export default Orders;

