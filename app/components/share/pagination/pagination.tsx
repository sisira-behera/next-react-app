'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get the current page from URL, default to 1
  const currentPage = Number(searchParams.get('page')) || 1;

  // Helper function to generate the exact destination URL
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-4 my-8 justify-center">
      {/* Previous Page Link */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border rounded-md transition ${
          currentPage <= 1 
            ? 'pointer-events-none opacity-50 bg-gray-100' 
            : 'hover:bg-gray-50'
        }`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
      >
        Previous
      </Link>

      {/* Page Indicator */}
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Page Link */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border rounded-md transition ${
          currentPage >= totalPages 
            ? 'pointer-events-none opacity-50 bg-gray-100' 
            : 'hover:bg-gray-50'
        }`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
      >
        Next
      </Link>
    </div>
  );
}
