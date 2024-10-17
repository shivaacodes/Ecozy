"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Reportcard() {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleReport = () => {
    console.log("Report button clicked"); // Debug log
    setShowAlert(true);
  };

  return (
    <div className="relative">
      <Card className=" border-gray-700">
        <CardHeader>
          <CardTitle>Report Disposal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="bg-neutral-900 text-gray-100"
            />
            <Textarea
              placeholder="Description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              className="bg-neutral-900 text-gray-100"
            />
            <Input type="file" accept="image/*" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="destructive" onClick={handleReport}>
              Report
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/user/profile")}
            >
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-sm w-full  border border-gray-700">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Reported</AlertTitle>
              <AlertDescription>
                Your report has been submitted successfully.
              </AlertDescription>
            </Alert>
            <Button onClick={() => setShowAlert(false)} className="w-full mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
