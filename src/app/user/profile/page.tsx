"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { Footer } from "react-day-picker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfilePage() {
  const router = useRouter();

  const user = {
    name: "Rony Mundackal",
    address: "Kannur",
    points: 256,
    reports: [
      {
        id: 1,
        title: "Cylon Kitchen waste dumping",
        content:
          "I noticed that the owner of Cylon Kitchen, located near Thekkinkadu maidan has been dumping leftover food outside, which is attracting rats. The rodents are now getting into the kitchen and contaminating the food utensils. This is a serious health risk, and I hope local authorities can address the situation to ensure food safety.",
      },
      {
        id: 2,
        title: "Waste dumping in Laloor",
        content:
          "I recently saw two young people dumping waste in an open area behind Laloor. It’s disappointing to see this happening when proper disposal options are available. This kind of behavior affects the environment and the community’s health. I hope local authorities can look into it and take steps to stop it.",
      },
      {
        id: 3,
        title: "Unsafe Debris on Sidewalk Poses Risk to Pedestrians",
        content:
          "I observed a construction site where workers are leaving debris scattered on the nearby sidewalk. It’s creating a safety hazard for pedestrians, who have to walk around it or risk tripping. This kind of carelessness needs to be addressed to keep the area safe for everyone.",
      },
    ],
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 w-full mt-32 italic">
      <div className="max-w-4xl mx-auto ">
        <div className="flex justify-between items-center mb-8 mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/user/dashboard")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>

          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 bg-red-800 h-9 text-sm border hover:bg-red-900 px-4 py-2 rounded-md">
              <LogOut className="w-4 h-4" />
              Logout
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-800 hover:bg-red-900 text-white"
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-lg text-muted-foreground">{user.address}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Report History</h2>
          <span className="text-xl font-extrabold text-green-400">
            Eco-Credits: {user.points}
          </span>
        </div>

        <div className="space-y-6">
          {user.reports.map((report, index) => (
            <Card key={report.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">
                  {index === 0 ? "Latest Report" : `Report ${report.id}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  {report.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
