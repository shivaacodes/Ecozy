import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("Rony");
  return (
    <nav className="flex justify-between items-center p-4 pt-60">
      <h1 className="text-2xl font-extrabold pl-6 pb-3">Hello, {userName}</h1>
      <div className="flex items-center space-x-4">
        <Avatar
          onClick={() => router.push("/user/profile")}
          className="cursor-pointer"
        >
          <AvatarImage src="/placeholder.svg" alt={userName} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
