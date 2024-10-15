"use client";

import { useState, useMemo } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Dashboard() {
  const [userName, setUserName] = useState("Rony");
  const [points, setPoints] = useState(256);

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
      label: "Food Waste",
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
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex justify-between items-center p-4 bg-card">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Hi {userName},</span>
          <Avatar>
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
              <Input placeholder="Enter schedule details" />
              <div className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Reschedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Waste Distribution</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
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
                                Visitors
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
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Disposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Title" />
              <Input placeholder="Description" />
              <Input type="file" accept="image/*" />
              <div className="flex justify-between">
                <Button>Report</Button>
                <Button variant="outline">View Reports</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Redeemable Voucher</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">
                {points} points
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => setPoints((prev) => prev + 1)}
              >
                Redeem
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Nearby Disposal Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted h-[300px] flex items-center justify-center">
                <p>Google Maps API</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
