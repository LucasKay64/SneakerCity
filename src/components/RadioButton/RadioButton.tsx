import * as React from "react";

import { cn } from "../../utils/utils";

interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <div className={cn("flex items-center", className)}>
        <label>
          <input
            ref={ref}
            id={id}
            type="radio"
            className={cn("mr-2")}
            {...props}
          />
          {children}
        </label>
      </div>
    );
  }
);
RadioButton.displayName = "RadioButton";

export { RadioButton };
