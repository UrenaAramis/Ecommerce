"use client";

import { useAuth } from "@/context/AuthContext";
import categoriesToPreLoad from "@/helpers/categories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogOutButton from "./LogOutButton";

const Navbar = () => {
  const { userData } = useAuth();
  const pathname = usePathname();

  return (
    <header className="bg-white inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg m-2">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" href="/">
              <img
                className="h-7 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt=""
              />
              <p className="sr-only">Website Title</p>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            {categoriesToPreLoad &&
              categoriesToPreLoad.map((category) => {
                const isActive = pathname === `/categories/${category.id}`;
                return (
                  <Link
                    key={category.id}
                    className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                    href={`/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
          </div>

          
          {userData?.token ? (
            <div className="flex items-center justify-end gap-3">
              <Link
                className={`hidden items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 sm:inline-flex ${
                  (pathname === "/dashboard" || pathname === "/dashboard/orders") 
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-900 hover:bg-gray-300"
                }`}
                href="/dashboard"
              >
                Profile
              </Link>
              <Link
                className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  pathname === "/cart"
                    ? "bg-gray-400 text-white"
                    : "bg-gray-500 text-white hover:bg-gray-400"
                }`}
                href="/cart"
              >
                Cart
              </Link>
              <LogOutButton />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <Link
                className={`hidden items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 sm:inline-flex ${
                  pathname === "/register"
                    ? "bg-gray-300 text-gray-900"
                    : "bg-white text-gray-900 hover:bg-gray-300"
                }`}
                href="/register"
              >
                Sign in
              </Link>
              <Link
                className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  pathname === "/login"
                    ? "bg-gray-500 text-white"
                    : "bg-black text-white hover:bg-gray-500"
                }`}
                href="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
