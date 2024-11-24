import React from "react";
import { ChevronDown } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onSelect: (value: Option["value"]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const SelectInput: React.FC<SelectProps> = ({
  options,
  value,
  onSelect,
  placeholder = "Select an option",
  disabled = false,
  testId,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <div className='relative'>
      <select
        data-testid={testId}
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 pr-8
          bg-white
          border border-gray-300 rounded-md
          shadow-sm
          appearance-none
          cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-50
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${className}
        `}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
        <ChevronDown className='w-4 h-4 text-gray-500' />
      </div>
    </div>
  );
};
