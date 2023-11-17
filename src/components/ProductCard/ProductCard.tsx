import * as React from "react";

import { cn } from "../../utils/utils";

import { Button } from "../Button/Button";

const ProductCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("shadow-xl rounded-3xl border bg-white", className)}
    {...props}
  />
));
ProductCard.displayName = "ProductCard";

interface ProductCardImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ProductCardImage = React.forwardRef<
  HTMLImageElement,
  ProductCardImageProps
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("border-b w-full h-48 object-contain", className)}
    {...props}
  />
));
ProductCardImage.displayName = "ProductCardImage";

const ProductCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xl text-center font-bold whitespace-nowrap overflow-hidden text-ellipsis px-3",
      className
    )}
    {...props}
  />
));
ProductCardTitle.displayName = "ProductCardTitle";

const ProductCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-center text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis px-3",
      className
    )}
    {...props}
  />
));
ProductCardDescription.displayName = "ProductCardDescription";

const ProductCardPrice = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg text-center font-bold", className)}
    {...props}
  />
));
ProductCardPrice.displayName = "ProductCardPrice";

// wrapper component for Button specific for ProductCard
const ProductCardButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(
      "w-full py-2 rounded-none rounded-b-3xl bg-gradient-to-r from-blue-primary to-blue-secondary text-white font-bold",
      className
    )}
    {...props}
    variant="none"
    size="none"
  />
));
ProductCardButton.displayName = "ProductCardButton";

export {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
};
