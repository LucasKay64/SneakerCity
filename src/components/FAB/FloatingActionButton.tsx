import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

const floatingActionButtonVariants = cva(
  "rounded-full shadow-md flex justify-center items-center p-2",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-primary to-blue-secondary",
      },
      size: {
        default: "w-16 h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingActionButtonVariants> {}

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(floatingActionButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
});
FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton };
