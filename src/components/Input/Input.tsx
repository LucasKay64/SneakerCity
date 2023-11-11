import * as React from "react";

import { cn } from "../../utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("border border-gray-300 rounded-xl p-2", className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
