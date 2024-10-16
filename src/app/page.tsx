"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-900 via-emerald-900 to-black text-white w-full animate-gradient-slow bg-[length:200%_200%]">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 w-full">
          <span className="text-green-400">eco</span>
          <br />
          Thrissur's Clean
          <br />
          Revolution Starts Here.
        </h2>
        <p className="text-xl mb-8 max-w-2xl">
          Join us in making Thrissur a greener, cleaner, and more sustainable
          city. Every small action counts towards a big change.
        </p>
        <div className="space-y-4">
          <Button size="lg" onClick={() => signIn()}>
            Sign In
          </Button>
          <div className="text-sm">
            <span className="mr-2">New User?</span>
            <Link
              href="/user/signup"
              className="text-green-400 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
