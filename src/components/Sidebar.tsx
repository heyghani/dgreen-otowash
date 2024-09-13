"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-600 text-white w-64 h-screen p-4">
      <nav>
        <ul>
          <li className={pathname === "/home" ? "bg-gray-700 p-2" : "p-2"}>
            <Link href="/home">Home</Link>
          </li>
          <li className={pathname === "/orders" ? "bg-gray-700 p-2" : "p-2"}>
            <Link href="/orders">Orders</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
