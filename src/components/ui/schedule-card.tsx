import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function Component() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [confirmedDate, setConfirmedDate] = useState<Date | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleReschedule = () => {
    console.log("Reschedule button clicked");
    if (selectedDate) {
      console.log("Date selected:", selectedDate);
      setConfirmedDate(selectedDate);
      setAlertMessage(
        `Appointment rescheduled to ${format(selectedDate, "MMMM dd, yyyy")}`
      );
    } else {
      console.log("No date selected");
      setAlertMessage("Please select a date before rescheduling.");
    }
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <Card className="relative">
      {alertMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black p-4 rounded-md shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Rescheduled</h3>
              <Button variant="ghost" size="icon" onClick={closeAlert}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Next pick up date:</p>
        <p className="text-2xl font-bold">
          {confirmedDate
            ? format(confirmedDate, "dd MMMM yyyy")
            : "Not scheduled"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between mt-10">
        <p className="text-sm text-muted-foreground ">Reschedule date:</p>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-green-400" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 ">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(newDate) => {
                setSelectedDate(newDate);
                setIsCalendarOpen(false);
              }}
              initialFocus
              disabled={(date) => date <= new Date()}
            />
          </PopoverContent>
        </Popover>
      </CardFooter>
      <div className="flex space-x-2 justify-end mt-10 p-6">
        <Button variant="outline">Cancel</Button>
        <Button variant="report" onClick={handleReschedule}>
          Reschedule
        </Button>
      </div>
    </Card>
  );
}
