"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
  loading = false,
}: PaginationProps) {
  // Calculate start and end of current page
  const start = ((currentPage - 1) * pageSize) + 1;
  const end = Math.min(currentPage * pageSize, total);

  // Generate page numbers to show (5-7 pages around current)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        startPage = 1;
        endPage = Math.min(maxVisiblePages, totalPages);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        endPage = totalPages;
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("ellipsis-start");
        }
      }

      // Add page numbers in range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("ellipsis-end");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results info */}
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
          aria-label="Previous page"
        >
          Previous
        </button>

        {/* Page number buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "ellipsis-start" || pageNum === "ellipsis-end") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-gray-500"
                >
                  ...
                </span>
              );
            }

            const page = pageNum as number;
            const isCurrentPage = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                disabled={loading}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isCurrentPage
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-default"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Go to page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || loading}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

