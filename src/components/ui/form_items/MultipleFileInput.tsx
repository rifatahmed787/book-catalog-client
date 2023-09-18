import React, { useContext, useState } from "react";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { cn } from "@/lib/utils";

type FileInputProps = {
  label?: string;
  onChange: (files: FileList | null) => void;
  placeholder: string;
  className?: string;
  required?: boolean;
  id?: string;
  multiple: boolean;
  htmlFor?: string;
  currentFile?: File[];
};

const MultipleFileInput = ({
  label,
  onChange,
  multiple,
  placeholder,
  className,
  required,
  id,
}: FileInputProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const defaultClassValue = `block py-1 px-0 w-full text-sm text-gray-900 bg-transparent  border-2 border-primary appearance-none rounded-md focus:outline-none focus:ring-0 focus:border-primary peer focus:border-t-1 pl-2 ${
    darkMode ? "text-white" : "text-gray-900"
  }`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    onChange(selectedFiles);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id || "input-box"}
        className={`absolute text-sm text-bold text-gray-500 transform transition-all ${
          isFocused
            ? "top-0 scale-75 -translate-y-3"
            : "top-3 scale-100 translate-y-0"
        } left-2 peer-focus:text-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:absolute peer-focus:z-10 px-2 ${
          darkMode
            ? "bg-gradient-backdrop text-white peer-focus:text-white"
            : "bg-white"
        }`}
      >
        {label}
      </label>
      <input
        id="file-input"
        type="file"
        className={cn(className, defaultClassValue)}
        onChange={handleFileChange}
        required={required ?? false}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiple={multiple}
      />
    </div>
  );
};

export default MultipleFileInput;
