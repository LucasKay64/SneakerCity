import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

import { cn } from "../../utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// a generic form component integrated with react-hook-form and yup for validation
// using the render props pattern
// it abstracts away the form setup process and handling of validation
// fully typed
// has to be used with Yup

interface FormProps<
  TFormValues extends FieldValues,
  Schema extends yup.AnyObjectSchema
> extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit" | "children"
  > {
  onSubmit: SubmitHandler<TFormValues>;
  schema?: Schema;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  id?: string;
}

const Form = <
  TFormValues extends FieldValues,
  Schema extends yup.AnyObjectSchema
>({
  className,
  onSubmit,
  schema,
  id,
  children,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <form
      className={cn("", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};

export { Form };
