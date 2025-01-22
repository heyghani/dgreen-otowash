"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-600 text-white w-64 p-4">
      <nav>
        <ul>
          <li className={pathname === "/home" ? "sidebar active" : "sidebar"}>
            <Link href="/home">Home</Link>
          </li>
          <li
            className={
              pathname === "/home/orders" ? "sidebar active" : "sidebar"
            }
          >
            <Link href="/home/orders">Orders</Link>
          </li>
          <li
            className={
              pathname === "/home/services" ? "sidebar active" : "sidebar"
            }
          >
            <Link href="/home/services">Services</Link>
          </li>
          <li
            className={
              pathname === "/home/add-on" ? "sidebar active" : "sidebar"
            }
          >
            <Link href="/home/add-on">Add-on</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
