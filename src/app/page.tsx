"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-900 via-emerald-900 to-black text-white w-full">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 w-full">
          <span className="text-green-400">eco</span>
          <br />
          Thrissur's Green
          <br />
          revolution starts here
        </h2>
        <p className="text-xl mb-8 max-w-2xl">
          Join us in making Thrissur a greener, cleaner, and more sustainable
          city. Every small action counts towards a big change.
        </p>
        <div>
          <Button size="lg" onClick={() => signIn()}>
            Sign In
          </Button>
        </div>
      </main>
    </div>
  );
}
