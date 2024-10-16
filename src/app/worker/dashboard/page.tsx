"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const collectionPoints = [
  {
    houseName: "Krishnadeepam",
    address: "Kadavu Rd Kannur",
    contactNo: "8545787410",
  },
  {
    houseName: "Sree Nilayam",
    address: "MG Road Trivandrum",
    contactNo: "9876543210",
  },
  {
    houseName: "Green Villa",
    address: "Beach Road Kozhikode",
    contactNo: "7890123456",
  },
];

const collectionData = [
  { name: "Plastic", value: 30 },
  { name: "Paper", value: 25 },
  { name: "Glass", value: 20 },
  { name: "Metal", value: 15 },
  { name: "Organic", value: 10 },
];

export default function Dashboard() {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [checkedHouses, setCheckedHouses] = useState<string[]>([]);

  const handleCheckboxChange = (houseName: string) => {
    setCheckedHouses((prev) =>
      prev.includes(houseName)
        ? prev.filter((name) => name !== houseName)
        : [...prev, houseName]
    );
  };

  return (
    <div className="container mx-auto p-4 bg-neutral-950 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6  text-white mt-72">
        Hello, Rony
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-neutral-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Collection points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">House name</TableHead>
                  <TableHead className="text-gray-300">Address</TableHead>
                  <TableHead className="text-gray-300">Contact no</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collectionPoints.map((point, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-gray-300">
                      {point.houseName}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {point.address}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {point.contactNo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Check-list</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {collectionPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`house-${index}`}
                    checked={checkedHouses.includes(point.houseName)}
                    onCheckedChange={() =>
                      handleCheckboxChange(point.houseName)
                    }
                    className="border-red-400 text-purple-400"
                  />
                  <Label htmlFor={`house-${index}`} className="text-gray-300">
                    {point.houseName}
                  </Label>
                </div>
              ))}
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Check className="mr-2 h-4 w-4" /> Submit
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="bg-neutral-900 text-gray-100 border-gray-600"
              />
              <Textarea
                placeholder="Description"
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="bg-neutral-900 text-gray-100 border-gray-600"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Report
            </Button>
            <Button
              variant="outline"
              className="border-black text-white hover:bg-neutral-900 font-extrabold hover:text-gray-200"
            >
              View Reports
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-neutral-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Today's Collection
            </CardTitle>
            <CardTitle className="text-sm text-gray-400">
              17th October Thursday
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={collectionData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {collectionData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: "#adfa1d" }}
                  />
                  <span className="text-gray-300">{`${entry.name}: ${entry.value}%`}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-gray-700 col-span-2 max-h-96">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-neutral-800 flex items-center justify-center max-h-72">
              <div className=" w-12 text-gray-500" />
              <span className="ml-0 text-gray-500">Google Map API</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
