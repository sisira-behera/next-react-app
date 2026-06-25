"use client";
import { Category } from "@/app/models/Categories";
import { Link, usePathname } from "@/i18n/navigation";
import useSWR from "swr";
import { categoryServices } from "@/lib/http-services";
import { useState } from "react";

export default function CategoryView() {

  const pathname = usePathname();

  // 1. Store the ID of the currently active item (default is first item)
  const [activeKey, setActiveKey] = useState('beauty');


  // SWR automatically uses the pre-fetched server data on initial mount
  const { data, error } = useSWR(
    "https://dummyjson.com/products/categories",
    categoryServices.getAllCategoriesFetcher,
  );

  if (error) return <div>Failed to load.</div>;
  if (!data) return <div>Loading...</div>;


  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid">
          {/* 2. Map through the array and render each string */}
          <ul className="nav-list">
            {data?.map((category: Category, index: number) => (
              <li className="w-full items-center inline-flex" key={index}>
                <Link
                  key={category.slug}
                  href={{
                    pathname: "/category/[slug]",
                    params: { slug: category.slug },
                  }}
                onClick={() => {setActiveKey(category.slug)}}
                className={activeKey === category.slug ? 'px-1 py-1 text-blue-600 border-b-2 border-blue-600' : 'px-1 py-1 text-gray-600'}
            >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
