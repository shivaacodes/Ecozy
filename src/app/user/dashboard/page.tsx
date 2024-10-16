"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Rony");
  const [points, setPoints] = useState(256);
  const [fade, setFade] = useState(false);

  const tips = [
    "☘️ Reduce plastic use wherever possible to help the environment and conserve resources. Remember that even small changes can make a big difference in reducing waste!",
    "🌴 Always recycle your waste responsibly. Check local guidelines to ensure you're recycling properly, as contamination can lead to entire batches being sent to landfill.",
    "💚 Compost organic waste to reduce landfill. Composting not only decreases the amount of waste sent to landfills but also provides nutrient-rich soil for gardening.",
    "🌲 Participate in local clean-up drives. Engaging with your community not only helps the environment but also raises awareness about littering and waste management.",
    "🌱 Educate others about waste management. Sharing knowledge and best practices can inspire others to adopt more sustainable habits.",
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setFade(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Bio-degradable",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Plastic",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "E-waste",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Metal",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Paper/Cardboard",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const days = Array.from({ length: 11 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString("en-GB");
  });

  return (
    <div className="min-h-screen bg-background text-foreground w-full pt-64">
      <nav className="flex justify-between items-center p-4 bg-card pt-80">
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

      <main className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {days.map((day) => (
                    <Input key={day} placeholder={`Schedule for ${day}`} />
                  ))}
                </div>
              </ScrollArea>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button variant={"report"}>Reschedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Waste Distribution</CardTitle>
              <CardDescription>October 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Waste Collected
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Plastic waste reduced by 3.8% this month!{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Waste Collection Data of the past month 🎉
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Disposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Title..." />
                <Textarea placeholder="Description..." />
                <Input type="file" accept="image/*" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="report">Report</Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/user/profile")}
                >
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="max-h-[200px]">
            <CardHeader>
              <CardTitle>Vouchers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">
                {points} Eco-Credits ☘️
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => setPoints((prev) => prev + 1)}
              >
                Redeem Now
              </Button>
            </CardContent>
          </Card>

          <Textarea
            className={` max-h-[180px] mt-3 pt-9 text-lg rounded-lg text-muted-foreground transition-opacity duration-900 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
            readOnly
            rows={3}
            value={tips[currentTipIndex]}
          />

          <Card className="max-h-[200px]">
            <CardHeader>
              <CardTitle>Government Sites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-light">
              <div className="space-y-4">
                {" "}
                {/* Space between each row */}
                {["Suchitwa Mission", "KSWMP"].map((place) => (
                  <div key={place} className="flex justify-between">
                    {/* Flex container for each row */}
                    <a
                      href={`#direction-to-${place.toLowerCase()}`}
                      className="text-blue-500 hover:underline"
                    >
                      {/* Link for the first place */}
                      {place} Location
                    </a>
                    <a
                      href={`#more-info-${place.toLowerCase()}`}
                      className="text-blue-500 hover:underline"
                    >
                      {/* Link for additional info */}
                      More Info
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
