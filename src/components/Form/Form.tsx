import * as React from "react";
import { useEffect } from "react";
// import { cva, type VariantProps } from "class-variance-authority";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
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
  defaultValues?: DefaultValues<TFormValues>;
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
  defaultValues,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: defaultValues,
  });

  // this is a workaround for the defaultValues since
  // react-hook-form caches it on the first render and
  // doesn't update it when the defaultValues prop changes
  // TODO: come up with a better solution later
  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

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
