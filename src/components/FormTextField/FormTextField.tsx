import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

import { UseFormRegisterReturn, FieldError } from "react-hook-form";

import { cn } from "../../utils/utils";
import { Input, InputProps } from "../Input/Input";
import { Label } from "../Label/Label";

// abstraction on the Input component for use in forms ( with the Form component )
// has to be used within the Form component to work properly as its coupled with it and uses react-hook-form

interface FormTextFieldProps extends InputProps {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "time"
    | "search"
    | "url";
  label?: string;
  name: string;
  registration: UseFormRegisterReturn;
  error?: FieldError | undefined;
}

const FormTextField = ({
  className,
  type = "text",
  label,
  name,
  registration, // this has to be extracted from the props beacause it spreads its own props
  error,
  inputSize = "lg",
  ...props
}: FormTextFieldProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        inputSize={inputSize}
        type={type}
        className={cn(
          `mt-1 ${error?.message ? "border-red-500" : ""}`,
          className
        )}
        {...registration}
        {...props}
      />
      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormTextField;
