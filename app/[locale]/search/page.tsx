import Pagination from "@/app/components/share/pagination/pagination";
import SearchInput from "@/app/components/share/search/search-input";
import { Link } from "@/i18n/navigation";
import { productServices } from "@/lib/http-services";

interface PageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10; // Items per page

  // Fetch paginated database or API records
  const { products: results, total: totalCount } =
    await productServices.fetchSearchResults(query, currentPage, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <main className="max-w-4xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      <SearchInput defaultValue={query} />

      <div className="my-6 space-y-4">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="p-4 border-b-1 rounded shadow-sm">
              <h2 className="font-semibold text-lg">
                <Link
                  key={item.id}
                  href={{ pathname: "/products/[id]", params: { id: item.id } }}
                  className="relative inline-block text-indigo-600"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {item.title}
                </Link>
              </h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No results found for `<strong>{query}</strong>`.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </main>
  );
}
