"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import logo from "@/assets/next.svg"; // Static image in the assets folder
import logoGlobe from "@/assets/globe.svg"; // Static image in the assets folder

import React, { useState } from "react";
import ThemeSelector from "./themeselector";
import LanguageSwitcher from "../../share/locale-selector/LanguageSwitcher";
import useCartStore from "@/app/store/cartStore";
import { LogIn, LogOut, ShoppingCart } from "lucide-react";


// import { useAuth } from "@/app/[locale]/context/AuthContext";

export default function Navbar() {
  // const { user, logoutUser } = useAuth();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const pathname = usePathname();

  // Extract locale from pathname (e.g., /en/about -> en)
  const locale = pathname.split("/")[1] || "en";

  const [isOpen, setIsOpen] = useState(false);

  const productId = "1"; // We can set in the props as well
  const catId = "beauty"; // We can set in the props as well

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}` });
    setIsOpen(!isOpen);
  };

  const items = useCartStore((state) => state.items);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              <Link key="homepage" href="/" className="flex items-center gap-3">
                <span className="sr-only">Next Commerce</span>
                <Image
                  src={logoGlobe.src}
                  alt="Next Commerce"
                  width={50}
                  height={50}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold">Next Commerce</span>
              </Link>
            </span>
            <span className="ml-4 text-gray-600 dark:text-gray-400">|</span>
            <LanguageSwitcher />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              key="about"
              href="/about"
              className={`px-1 py-1 ${
                pathname === "/about"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              About
            </Link>
            <Link
              key={catId}
              href={{ pathname: "/category/[slug]", params: { slug: catId } }}
              className={`px-1 py-1 ${
                pathname === "/category/[slug]"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Category
            </Link>
            {/* <Link
              key={productId}
              href={{ pathname: "/products/[id]", params: { id: productId } }}
              className={`px-1 py-1 ${
                pathname === "/products/[id]"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              PDP
            </Link> */}
            <Link
              key="search"
              href="/search"
              className={`px-1 py-1 ${
                pathname === "/search"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Search
            </Link>
            <span className="p-1"> | </span>
            {/* Language Switcher and Auth Links */}
            {session && (
              <Link
                href="/myaccount"
                className={`px-1 py-1 ${
                  pathname === "/myaccount"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                My Account
              </Link>
            )}
            {isLoading ? (
              <span>Loading...</span>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                <span>Hi, {session.user?.name?.split(" ")[0] || "User"}!</span>
                <button
                  onClick={() => handleSignOut()}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
                >
                  <LogOut size={18} strokeWidth={2} /> Sign Out
                </button>
              </div>
            ) : (
              <Link
                key="login"
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
              >
                <LogIn size={18} strokeWidth={2} /> Sign In
              </Link>
            )}
            <span className="p-1"> | </span>
            <Link
              key="misc"
              href="/misc"
              className={`px-1 py-1 ${
                pathname === "/misc"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              Misc (3)
            </Link>

            <span className="p-1"> | </span>
            {/* The following is an example of cart context*/}
            {/* <Cart /> */}
            <Link key="cart" href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
            {/* Dark Mode Toggle */}
            {/* <ThemeSelector /> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <hr />
          <Link
            key="about"
            href="/about"
            onClick={() => setIsOpen(!isOpen)}
            className={`block px-1 py-1 ${
              pathname === "/about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            About
          </Link>
          <Link
            key={catId}
            href={{ pathname: "/category/[slug]", params: { slug: catId } }}
            onClick={() => setIsOpen(!isOpen)}
            className={`block px-1 py-1 ${
              pathname === `/category/[slug]`
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Category
          </Link>
          {/* <Link
            key={productId}
            href={{ pathname: "/products/[id]", params: { id: productId } }}
            onClick={() => setIsOpen(!isOpen)}
            className={`block px-1 py-1 ${
              pathname === `/products/[id]`
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            PDP
          </Link> */}
          <Link
            key="search"
            href="/search"
            onClick={() => setIsOpen(!isOpen)}
            className={`block px-1 py-1 ${
              pathname === "/search"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Search
          </Link>
          <hr />
          <Link
            key="misc"
            href="/misc"
            onClick={() => setIsOpen(!isOpen)}
            className={`block px-1 py-1 ${
              pathname === "/misc"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Misc (3)
          </Link>

          <hr />
          <div className="flex flex-col space-y-2">
            {session && (
              <Link
                href="/myaccount"
                onClick={() => setIsOpen(!isOpen)}
                className={`block px-1 py-1 ${
                  pathname === "/myaccount"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                My Account
              </Link>
            )}
            {isLoading ? (
              <span>Loading...</span>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    width={16}
                    height={16}
                    alt={session.user.name || "User"}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                <span>Hi, {session.user?.name?.split(" ")[0] || "User"}!</span>
                <button
                  onClick={() => handleSignOut()}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
                >
                  <LogOut size={18} strokeWidth={2} /> Sign Out <LogOut size={18} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <Link
                key="login"
                href="/login"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm flex items-center gap-2"
              >
                <LogIn size={18} strokeWidth={2} /> Sign In
              </Link>
            )}
            {/* The following is an example of cart context*/}
            {/* <Cart /> */}

            <Link
              href="/cart"
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>

            <ThemeSelector />
          </div>
        </div>
      )}
    </nav>
  );
}
