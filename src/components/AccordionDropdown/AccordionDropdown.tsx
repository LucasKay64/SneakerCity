import * as React from "react";
import { useState, createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

import ArrowDownDropdown from "../../assets/icons/arrow-down-dropdown.svg";

const AccordionDropdownContext = createContext({
  isOpen: false,
  toggleDropdownOpen: () => {},
});

const AccordionDropdownVariants = cva("border-b bg-white w-full", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "p-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface AccordionDropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AccordionDropdownVariants> {}

const AccordionDropdown = React.forwardRef<
  HTMLDivElement,
  AccordionDropdownProps
>(({ className, variant, size, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <AccordionDropdownContext.Provider value={{ isOpen, toggleDropdownOpen }}>
      <div
        ref={ref}
        className={cn(AccordionDropdownVariants({ variant, size, className }))}
        {...props}
      />
    </AccordionDropdownContext.Provider>
  );
});
AccordionDropdown.displayName = "AccordionDropdown";

const AccordionDropdownHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen, toggleDropdownOpen } = useContext(AccordionDropdownContext);

  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center cursor-pointer",
        className
      )}
      {...props}
      onClick={toggleDropdownOpen}
    >
      <p className="font-bold">{children}</p>
      <img
        src={ArrowDownDropdown}
        alt="Dropdown arrow icon"
        className={`w-5 h-5 transition-all duration-500 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  );
});
AccordionDropdownHeader.displayName = "AccordionDropdownHeader";

const AccordionDropdownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen } = useContext(AccordionDropdownContext);

  return (
    <div
      ref={ref}
      className={cn(
        `overflow-hidden 
        grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`,
        className
      )}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
});
AccordionDropdownContent.displayName = "AccordionDropdownContent";

export { AccordionDropdown, AccordionDropdownHeader, AccordionDropdownContent };
