import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoAddOutline, IoSearchOutline } from 'react-icons/io5';

interface BranchesHeaderProps {
  onSearch: (query: string) => void;
  onAdd: () => void;
}

const BranchesHeader: React.FC<BranchesHeaderProps> = ({ onSearch, onAdd }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-800">{t('Branches')}</h1>
        <p className="text-neutral-500 mt-1">{t('Manage your restaurant branches and their settings')}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative group">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors text-xl" />
          <input
            type="text"
            placeholder={t('Search branches...')}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-80 shadow-sm"
          />
        </div>
        
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          <IoAddOutline className="text-xl" />
          <span className="font-semibold">{t('Add Branch')}</span>
        </button>
      </div>
    </div>
  );
};

export default BranchesHeader;
