import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

const buttonVariants = cva(
  "rounded-xl transition-[background-color] duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-blue-primary hover:bg-blue-secondary text-white",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
        danger: "bg-red-500 hover:bg-red-700 text-white",
        none: "",
      },
      size: {
        default: "px-5 py-2",
        lg: "px-8 py-3",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
