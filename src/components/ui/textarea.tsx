import React from "react";
import { cn } from "~/lib/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      onChange,
      label,
      error,
      placeholder = "Enter your text here...",
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={cn(
            "w-full p-4",
            "border border-gray-300 rounded-xl",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "placeholder:text-gray-400",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "resize-none",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
