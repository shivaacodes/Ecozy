"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table1";

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
import Footer from "@/components/Footer";
import Component from "@/components/ui/schedule-card";
import Reportcard from "@/components/ui/report-card";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Rony");
  const [points, setPoints] = useState(256);
  const [fade, setFade] = useState(false);

  const tips = [
    "Reduce plastic use wherever possible to help the environment and conserve resources. Remember that even small changes can make a big difference in reducing waste!",
    "Always recycle your waste responsibly. Check local guidelines to ensure you're recycling properly, as contamination can lead to entire batches being sent to landfill.",
    "Compost organic waste to reduce landfill. Composting not only decreases the amount of waste sent to landfills but also provides nutrient-rich soil for gardening.",
    "Participate in local clean-up drives. Engaging with your community not only helps the environment but also raises awareness about littering and waste management.",
    "Educate others about waste management. Sharing knowledge and best practices can inspire others to adopt more sustainable habits.",
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

  const [date, setDate] = useState<Date | undefined>(new Date("2024-10-12"));

  const days = Array.from({ length: 11 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString("en-GB");
  });

  return (
    <div className="min-h-screen bg-background text-foreground w-full pt-64">
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

      <main className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Component></Component>

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

          <Reportcard></Reportcard>

          <Card className="max-h-[200px]">
            <CardHeader>
              <CardTitle>Vouchers</CardTitle>
            </CardHeader>
            <CardContent className="pr-0">
              <p className="text-4xl lg:text-3xl font-bold text-green-500">
                {points} Eco-Credits☘️
              </p>
              <div className="pr-6">
                <Button
                  className="mt-4 w-full"
                  onClick={() => setPoints((prev) => prev + 1)}
                >
                  Redeem Now
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="max-h-[200px]">
            <CardHeader>
              <CardTitle>Government Sites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-light italic">
              <div className="space-y-4">
                {" "}
                {["Suchitwa Mission", "KSWMP"].map((place) => (
                  <div key={place} className="flex justify-between">
                    <a
                      href={`#direction-to-${place.toLowerCase()}`}
                      className="text-blue-500 hover:underline"
                    >
                      {place}
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

          <Textarea
            className={`max-h-[180px] italic mt-2 pt-3 text-md rounded-lg text-muted-foreground transition-opacity duration-900 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
            readOnly
            rows={4}
            value={`💚 Green Insights\n\n${tips[currentTipIndex]}`}
          />
          <Card className="h-auto col-span-full">
            <CardHeader>
              <CardTitle>Monthly Collection Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-full bg-black border-collapse">
                  <TableHeader>
                    <TableRow className="bg-muted-foreground bg-neutral-900 text-left font-extrabold italic">
                      <TableCell className="py-2 px-12">Date</TableCell>
                      <TableCell className="py-2 px-10">Waste Type</TableCell>
                      <TableCell className="py-2 px-13">Weight (kg)</TableCell>
                      <TableCell className="py-2 px-10">
                        Eco-Credit Earned ☘️
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        date: "01/10/2024",
                        type: "Plastic",
                        weight: 2.5,
                        ecoCredit: 10,
                      },
                      {
                        date: "03/10/2024",
                        type: "Bio-degradable",
                        weight: 1.2,
                        ecoCredit: 5,
                      },
                      {
                        date: "05/10/2024",
                        type: "E-waste",
                        weight: 3.8,
                        ecoCredit: 9,
                      },
                      {
                        date: "05/10/2024",
                        type: "E-waste",
                        weight: 3.8,
                        ecoCredit: 2,
                      },
                      {
                        date: "05/10/2024",
                        type: "E-waste",
                        weight: 3.8,
                        ecoCredit: 5,
                      },
                    ].map((item, index) => (
                      <TableRow key={index} className="border-t italic">
                        <TableCell className="py-2 px-20 bg-neutral-900">
                          {item.date}
                        </TableCell>
                        <TableCell className="py-2 px-20 bg-neutral-900">
                          {item.type}
                        </TableCell>
                        <TableCell className="py-2 px-20 bg-neutral-900">
                          {item.weight}
                        </TableCell>
                        <TableCell className="py-2 px-20 text-green-400 bg-neutral-900">
                          {item.ecoCredit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
