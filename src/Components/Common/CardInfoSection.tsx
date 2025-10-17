import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const CardInfoSection = ({ title, children }: Props) => {
  return (
    
    <div className="mb-8">
      
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      <div className="border border-gray-300 rounded-lg w-full">{children}</div>
    </div>
  );
};

export default CardInfoSection;
