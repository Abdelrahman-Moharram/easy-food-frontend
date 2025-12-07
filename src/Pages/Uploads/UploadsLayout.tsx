import { useTranslation } from 'react-i18next';
import LinksTabs from '../../Components/ui/Common/LinksTabs';
import { Outlet } from 'react-router-dom';

const UploadsLayout = () => {
  const {t}=useTranslation() 
  const tabs = [
    {title:t("Monthly Upload"), link:'monthly'},
    {title:t("Daily Upload"), link:'daily'},
    {title:t("Manual Upload"), link:'manual'},  
  ]


  return (
    
    <div className="w-full min-h-screen p-6 bg-gray-50">
        <LinksTabs 
            tabs={tabs}
        />
        <Outlet />
    </div>
  );
};

export default UploadsLayout
