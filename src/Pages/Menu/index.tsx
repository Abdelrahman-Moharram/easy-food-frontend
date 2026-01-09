import { ProfessionalMenuTemplate } from '../../Components/pages/Menu/Templates';
import MenuForm from '../../Components/pages/Menu/MenuForm';
import OrderSections from '../../Components/pages/Menu/OrderSections';
import { useGetMenuDetailsQuery } from '../../redux/api/menusApi';
import { useAppSelector } from '../../redux/hooks';

const ProfessionalMenuBuilder = () => {
  const {resturant} = useAppSelector(state=>state.auth.user)
  const {data}  = useGetMenuDetailsQuery({resturant_id:resturant?.id}, {skip:!resturant?.id})
  console.log(data);
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans text-neutral-800">
      
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-5 justify-center gap-10">
        
        {/* --- LEFT SIDE: THE MENU PREVIEW (2/3) --- */}
        <div className="col-span-1 mx-auto">
          <OrderSections 
          
          />
        </div>
        
        {/* --- LEFT SIDE: THE MENU PREVIEW (2/3) --- */}
        <div className="col-span-3  w-[80%] mx-auto">
          <ProfessionalMenuTemplate 
            menu={data}
          />
        </div>

        {/* --- RIGHT SIDE: EDITOR TOOLS (1/3) --- */}
        <div className="col-span-1 mx-auto">
          <MenuForm />
        </div>

      </div>
    </div>
  );
};

export default ProfessionalMenuBuilder;