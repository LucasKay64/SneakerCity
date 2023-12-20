import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/utils";

import ArrowDownDropdown from "../../assets/icons/arrow-down-dropdown.svg";

import { useState } from "react";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPages?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      totalPages = 10,
      page = 1,
      onPageChange = undefined,
      ...props
    },
    ref
  ) => {
    const [currentPage, setPage] = useState(page);

    const handleChange = (page: number) => {
      if (page < 1 || page > totalPages) {
        return;
      }

      setPage(page);

      if (onPageChange) {
        onPageChange(page);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-center items-center gap-3 py-6 px-2",
          className
        )}
        {...props}
      >
        <button
          onClick={() => handleChange(currentPage - 1)}
          className={`w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-200 transition-[background-color] ${
            currentPage === 1 ? "opacity-20" : ""
          }`}
          disabled={currentPage === 1}
        >
          <img
            src={ArrowDownDropdown}
            alt="arrow left icon"
            className="rotate-90 w-5"
          />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isCurrentPage = currentPage === pageNumber;
          const isPageInRange =
            pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1;
          const isFirstOrLastPage =
            pageNumber === 1 || pageNumber === totalPages;
          const isWithinFirstFivePages = pageNumber <= 5;
          const isCurrentPageWithinFirstFourPages = currentPage <= 4;
          const isWithinLastFivePages = pageNumber >= totalPages - 4;
          const isCurrentPageWithinLastFourPages =
            currentPage >= totalPages - 3;
          const shouldDisplayPage =
            (isWithinFirstFivePages && isCurrentPageWithinFirstFourPages) ||
            (isWithinLastFivePages && isCurrentPageWithinLastFourPages) ||
            isCurrentPage ||
            isPageInRange ||
            isFirstOrLastPage;

          if (!shouldDisplayPage) {
            const previousPageNumber = pageNumber - 1;
            const isPreviousPageInRange =
              previousPageNumber >= currentPage - 1 &&
              previousPageNumber <= currentPage + 1;
            const isPreviousPageFirstOrLast =
              previousPageNumber === 1 || previousPageNumber === totalPages;
            const isPreviousPageWithinFirstFivePages = previousPageNumber <= 5;
            const isCurrentPageWithinFirstFourPages = currentPage <= 4;
            const isPreviousPageWithinLastFivePages =
              previousPageNumber >= totalPages - 4;
            const isCurrentPageWithinLastFourPages =
              currentPage >= totalPages - 3;
            const isPreviousPageDisplayed =
              (isPreviousPageWithinFirstFivePages &&
                isCurrentPageWithinFirstFourPages) ||
              (isPreviousPageWithinLastFivePages &&
                isCurrentPageWithinLastFourPages) ||
              isPreviousPageInRange ||
              isPreviousPageFirstOrLast;

            if (isPreviousPageDisplayed) {
              return (
                <span
                  key={index}
                  className="w-10 h-10 flex justify-center items-center"
                >
                  ...
                </span>
              );
            }

            return null;
          }

          return (
            <button
              key={index}
              onClick={() => handleChange(pageNumber)}
              className={cn(
                "w-10 h-10 rounded-full",
                `${
                  currentPage === index + 1
                    ? "bg-blue-primary text-white"
                    : "text-black hover:bg-gray-200 transition-[background-color]"
                }`
              )}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handleChange(currentPage + 1)}
          className={`w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-200 transition-[background-color]
            ${currentPage === totalPages ? "opacity-20" : ""}
          `}
          disabled={currentPage === totalPages}
        >
          <img
            src={ArrowDownDropdown}
            alt="arrow right icon"
            className="-rotate-90 w-5"
          />
        </button>
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };
