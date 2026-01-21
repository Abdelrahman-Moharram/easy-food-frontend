import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoEllipsisHorizontal, IoSettingsOutline, IoTrashOutline, IoPencilOutline } from 'react-icons/io5';

interface ResourceCardProps {
  id: string;
  name: string;
  image?: string;
  status?: 'active' | 'inactive';
  details: {
    icon: React.ReactNode;
    text: string;
  }[];
  actions?: {
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onSettings?: (id: string) => void;
  };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ id, name, image, status, details, actions }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 overflow-hidden flex flex-col group">
      {/* Header with Image or Gradient */}
      <div className="h-32 bg-gradient-to-r from-primary/80 to-primary relative overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-lg p-1.5 cursor-pointer hover:bg-white/30 transition-colors">
          <IoEllipsisHorizontal className="text-white text-xl" />
        </div>
        {status && (
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {t(status)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="space-y-3 text-neutral-600 mb-6">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-primary mt-1 flex-shrink-0">{detail.icon}</span>
              <span className="text-sm line-clamp-2">{detail.text}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        {actions && (
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              {actions.onEdit && (
                <button 
                  onClick={() => actions.onEdit!(id)}
                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors title='Edit'"
                >
                  <IoPencilOutline className="text-lg" />
                </button>
              )}
              {actions.onDelete && (
                <button 
                  onClick={() => actions.onDelete!(id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors title='Delete'"
                >
                  <IoTrashOutline className="text-lg" />
                </button>
              )}
            </div>
            
            {actions.onSettings && (
              <button 
                onClick={() => actions.onSettings!(id)}
                className="flex items-center gap-2 text-primary font-semibold text-sm hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all"
              >
                <IoSettingsOutline className="text-lg" />
                {t('Settings')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
