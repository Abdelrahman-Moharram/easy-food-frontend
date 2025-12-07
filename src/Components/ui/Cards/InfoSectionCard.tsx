import React from "react";

interface Props {
  title: string;
  sub_title?: string;
  children: React.ReactNode;
}

const InfoSectionCard = ({ title, sub_title, children }: Props) => {
  return (
    <div className="my-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="text-sm text-black/50">{sub_title}</div>
        </div>
        <div className="border border-primary rounded-xl w-full p-4">{children}</div>
    </div>
  );
};

export default InfoSectionCard;