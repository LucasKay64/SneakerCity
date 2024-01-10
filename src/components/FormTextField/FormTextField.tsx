import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { UseFormRegisterReturn, FieldError } from "react-hook-form";

import { cn } from "../../utils/utils";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";

// abstraction on the Input component for use in forms ( with the Form component )
// has to be used within the Form component to work properly as its coupled with it and uses react-hook-form

interface FormTextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "time"
    | "search"
    | "url";
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError | undefined;
}

const FormTextField = ({
  className,
  type = "text",
  label,
  name,
  id,
  placeholder,
  registration,
  error,
  ...props
}: FormTextFieldProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        inputSize="lg"
        id={id}
        placeholder={placeholder}
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
