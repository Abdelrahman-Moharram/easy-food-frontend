import { MealsForm, MenuStructure } from '../../Components/pages/Menu/Form';
import { ProfessionalMenuTemplate } from '../../Components/pages/Menu/Templates';


const ProfessionalMenuBuilder = () => {
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans text-neutral-800">
      
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-5 justify-center md:gap-5 ">
        
        <div className="col-span-1">
          <MenuStructure />
        </div>
        
        <div className="col-span-3  w-[80%] mx-auto">
          <ProfessionalMenuTemplate />
        </div>

        <div className="col-span-1 mx-auto">
          <MealsForm />
        </div>

      </div>
    </div>
  );
};

export default ProfessionalMenuBuilder;