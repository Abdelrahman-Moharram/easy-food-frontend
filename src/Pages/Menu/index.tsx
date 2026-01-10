import { MealsForm, MenuStructure } from '../../Components/pages/Menu/Form';
import { ProfessionalMenuTemplate } from '../../Components/pages/Menu/Templates';
import { useAppSelector } from '../../redux/hooks';


const ProfessionalMenuBuilder = () => {
  const {resturant} = useAppSelector(state=>state.auth.user)
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans text-neutral-800">
      
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-5 justify-center gap-10">
        
        <div className="col-span-1">
          <MenuStructure 
            resturant_id={resturant?.id}
          />
        </div>
        
        <div className="col-span-3  w-[80%] mx-auto">
          <ProfessionalMenuTemplate 
            resturant_id={resturant?.id}
          />
        </div>

        <div className="col-span-1 mx-auto">
          <MealsForm />
        </div>

      </div>
    </div>
  );
};

export default ProfessionalMenuBuilder;