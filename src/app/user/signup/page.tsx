"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState("");

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, address, phone, password }), // Include password in the body
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          console.error("Error data:", errorData);
          setError(errorData.error || "An error occurred. Please try again.");
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          console.error("Raw response:", text);
          setError("An unexpected error occurred. Please try again.");
        }
        return;
      }

      const data = await response.json();
      console.log("User created:", data);

      toast.success("Account created successfully!");

      // Reset form fields
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setPassword(""); // Reset password field

      // Redirect to home page
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Unexpected error. Please try again later.");
    }
  };

  return (
    <>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
};

export default ProfileCard;
