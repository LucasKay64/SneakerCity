import * as React from "react";

import { cn } from "../../utils/utils";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn("", className)} {...props}>
        {children}
      </label>
    );
  }
);

export { Label };
