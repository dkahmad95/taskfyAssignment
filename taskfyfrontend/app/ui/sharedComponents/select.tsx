import React from "react";
import clsx from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  labelClassName?: string;
}

export function Select({
  className,
  label,
  options,
  labelClassName,
  ...rest
}: SelectProps) {
  return (
    <div className="gap-2 ">
      {label && (
        <label
          className={clsx(
            "mb-3 mt-5 block text-xs font-medium text-gray-900",

            rest.value ? "text-xs text-gray-500" : "",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <select
        {...rest}
        className={clsx(
          "w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 transition-colors",
          "text-gray-700 placeholder-gray-400 bg-white",
          "focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-offset-0",
          "sm:text-sm",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
