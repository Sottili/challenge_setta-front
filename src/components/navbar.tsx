"use client";

// Next & React
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-indigo-600 text-3xl font-bold whitespace-nowrap">
            Metrics FS
          </span>
        </a>
      </div>
    </nav>
  );
}
