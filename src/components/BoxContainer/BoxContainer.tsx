import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

interface BoxContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const BoxContainer = React.forwardRef<HTMLDivElement, BoxContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("shadow-xl rounded-3xl border bg-white", className)}
        {...props}
      />
    );
  }
);

export { BoxContainer };
