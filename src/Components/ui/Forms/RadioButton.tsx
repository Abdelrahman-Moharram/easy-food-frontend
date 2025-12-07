import React, { ChangeEvent } from 'react';

interface Props {
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  labelId: string;
  name: string;
  required?: boolean,
  disabled?: boolean
}

const RadioButton = ({ checked, onChange, label, labelId, name, required=true, disabled=false }: Props) => {
  return (
    <label
      htmlFor={labelId}
      className={`flex cursor-pointer border items-center justify-between gap-4 rounded-lg py-4 px-4 transition bg-container
        ${
          checked
            ? ' border-2 border-primary shadow-sm'
            : 'bg-container/90'
        }`}
    >
      <div className="flex-1">
        <strong className="font-medium text-gray-900">{label}</strong>
      </div>

      <div className="flex items-center">
        <input
          checked={checked}
          name={name}
          onChange={onChange}
          type="radio"
          className="appearance-none w-4 h-4 border rounded-full checked:bg-primary border-primary"
          id={labelId}
          required={required}
          value={labelId}
          disabled={disabled}
        />
      </div>
    </label>
  );
};

export default RadioButton;
