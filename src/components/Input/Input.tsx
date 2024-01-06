import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

const inputVariants = cva(
  "border border-gray-300 bg-gray-50 rounded-xl w-full",
  {
    variants: {
      inputSize: {
        sm: "py-1 px-2",
        default: "p-2",
        lg: "px-3 py-3",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ inputSize, className }))}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
