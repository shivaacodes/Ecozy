"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
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
import Reportcard from "@/components/ui/report-card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
  {
    houseName: "Shivam",
    address: "Kadavu Rd Kannur",
    contactNo: "8545787410",
  },
];

const collectionData = [
  { name: "Plastic", value: 30 },
  { name: "Paper", value: 40 },
  { name: "Glass", value: 20 },
  { name: "Metal", value: 15 },
  { name: "Organic", value: 20 },
];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Dashboard() {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [checkedHouses, setCheckedHouses] = useState<string[]>([]);
  const router = useRouter();

  const handleCheckboxChange = (houseName: string) => {
    setCheckedHouses((prev) =>
      prev.includes(houseName)
        ? prev.filter((name) => name !== houseName)
        : [...prev, houseName]
    );
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA5bMiRspz5PfZFUdv876XAdSm4jAPrss4",
  });

  const plantLocations = [
    {
      id: 1,
      name: "Sakthan Thampuran Bio-Waste Treatment Plant",
      lat: 10.521,
      lng: 76.2144,
    },
    {
      id: 2,
      name: "Chalakudy Wastewater Treatment Plant",
      lat: 10.3071,
      lng: 76.3189,
    },
    {
      id: 3,
      name: "Nattika Beach Waste Treatment",
      lat: 10.3545,
      lng: 76.0674,
    },
  ];
  const [housename, setHousename] = useState("");
  const [wasteEntries, setWasteEntries] = useState([
    { type: "", weight: "" },
    { type: "", weight: "" },
    { type: "", weight: "" },
  ]);

  const handleWasteChange = (
    index: number,
    field: "type" | "weight",
    value: string
  ) => {
    const newEntries = [...wasteEntries];
    newEntries[index][field] = value;
    setWasteEntries(newEntries);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", { housename, wasteEntries });
    // Here you would typically send this data to your backend
  };
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const [mapCenter, setMapCenter] = useState({ lat: 10.5276, lng: 76.2144 });

  return (
    <div className="container mx-auto p-4 bg-neutral-950 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6  text-white mt-40">
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
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Collection Details</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="housename">Housename</Label>
                <Select onValueChange={setHousename} value={housename}>
                  <SelectTrigger id="housename">
                    <SelectValue placeholder="Select a house" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house1">Krishnadeepam</SelectItem>
                    <SelectItem value="house2">Sree Nilayam</SelectItem>
                    <SelectItem value="house3">Green Villa</SelectItem>
                    <SelectItem value="house3">Shivam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {wasteEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`waste-type-${index}`}>Waste Type</Label>
                    <Input
                      id={`waste-type-${index}`}
                      value={entry.type}
                      onChange={(e) =>
                        handleWasteChange(index, "type", e.target.value)
                      }
                      placeholder="Enter waste type"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`waste-weight-${index}`}>Weight</Label>
                    <Input
                      id={`waste-weight-${index}`}
                      value={entry.weight}
                      onChange={(e) =>
                        handleWasteChange(index, "weight", e.target.value)
                      }
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Reportcard></Reportcard>
        <Card className="bg-neutral-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Today's Collection
            </CardTitle>
            <CardTitle className="text-sm text-gray-400">
              17th October Thursday
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-10">
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
        <Card className="w-full md:col-span-2">
          <CardHeader>
            <CardTitle>Find Disposal Centers Near You</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={mapCenter}
              >
                {plantLocations.map((plant) => (
                  <Marker
                    key={plant.id}
                    position={{ lat: plant.lat, lng: plant.lng }}
                    title={plant.name}
                  />
                ))}
              </GoogleMap>
            ) : (
              <p>Loading map...</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
