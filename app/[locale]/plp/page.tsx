
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import ProductList from "../components/product/product-list/product-list";

export default async function ProductListPage({ params }: { params: Promise<{ locale: string }> }) {

  const {locale} = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Product List Page
          </h1>
          <ProductList /> {/* Add the ProductList component here */}
        </div>
    </div>
  );
}
