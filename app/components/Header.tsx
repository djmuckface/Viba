"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/viba-logo.svg" alt="Viba Logo" width={40} height={40} />
        <span className="font-bold text-xl">Viba</span>
      </Link>
      <nav className="space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </nav>
    </header>
  );
}
