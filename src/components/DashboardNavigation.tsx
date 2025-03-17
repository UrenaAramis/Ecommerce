
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavigation() {
  const pathname = usePathname();

  return (
    <div className=" flex flex-row items-center justify-center gap-4">
      <Link
        href="/dashboard"
        className={`w-32 text-center inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          pathname === "/dashboard"
            ? "bg-gray-500"
            : "bg-black hover:bg-gray-500"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/orders"
        className={`w-32 text-center inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          pathname === "/dashboard/orders"
            ? "bg-gray-500"
            : "bg-black hover:bg-gray-500"
        }`}
      >
        Orders
      </Link>
    </div>
  );
}
