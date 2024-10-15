"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, phone }),
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
      setName("");
      setAddress("");
      setPhone("");
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Unexpected error. Please try again later.");
    }
  };
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Complete your profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
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
  );
};

export default ProfileCard;
