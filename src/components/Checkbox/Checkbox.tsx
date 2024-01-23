import * as React from "react";

import { cn } from "../../utils/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <div className={cn("flex items-center", className)}>
        <label>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={cn("mr-2")}
            {...props}
          />
          {children}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
