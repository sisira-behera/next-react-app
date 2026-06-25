'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // npm i use-debounce

export default function SearchInput({ defaultValue }: { defaultValue: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce prevents rapid database fetches on every single keystroke
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset back to page 1 for a brand new search keyword
    params.set('page', '1'); 

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500); // 500ms debounce delay

  return (
    <input
      type="text"
      placeholder="Search items..."
      defaultValue={defaultValue}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full p-2 border rounded-md focus:outline-blue-500"
    />
  );
}