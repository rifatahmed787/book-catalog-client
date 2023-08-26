import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { cn } from "@/lib/utils";
import { InputType } from "@/types/Input";
import { useContext, useState } from "react";

type ITextInput = {
  label?: string;
  type: InputType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string | number;
  placeHolder: string;
  className?: string;
  required?: boolean;
  htmlFor?: string;
  id?: string;
};

const TextInput = ({
  label,
  type,
  onChange,
  currentValue,
  placeHolder,
  className,
  required,
  id,
}: ITextInput) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const defaultClassValue = `block py-3 px-0 w-full text-sm bg-transparent border-2 border-primary appearance-none rounded-md focus:outline-none focus:ring-0 focus:border-primary peer focus:border-t-1 pl-2 ${
    darkMode ? "text-white" : "text-gray-900"
  }`;

  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor={id || "input-box"}
        className={`absolute text-sm text-bold text-gray-500 transform transition-all ${
          isFocused || currentValue
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
        id={id || "input-box"}
        className={cn(className, defaultClassValue)}
        type={type}
        value={currentValue}
        onChange={onChange}
        placeholder={placeHolder}
        required={required ?? false}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default TextInput;
