import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoAddOutline, IoSearchOutline } from 'react-icons/io5';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  addLabel?: string;
  extraActions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  searchPlaceholder, 
  onSearch, 
  onAdd, 
  addLabel,
  extraActions 
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-800">{t(title)}</h1>
        {subtitle && <p className="text-neutral-500 mt-1">{t(subtitle)}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative group">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors text-xl" />
            <input
              type="text"
              placeholder={t(searchPlaceholder || 'Search...')}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-80 shadow-sm"
            />
          </div>
        )}
        
        {extraActions}

        {onAdd && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <IoAddOutline className="text-xl" />
            <span className="font-semibold">{t(addLabel || 'Add')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
