"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("Credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      window.location.href = "/user/dashboard";
    }
  };

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

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button size="lg" type="submit">
            Sign In
          </Button>
        </form>

        <div className="text-sm mt-4">
          <span className="mr-2">New User?</span>
          <Link href="/user/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
