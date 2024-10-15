import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  //  fetch this data from an API or database
  const user = {
    name: "Rony Mundackal",
    address: "Kannur",
    points: 256,
    reports: [
      {
        id: 1,
        title: "Latest Report",
        content: "Content of the latest report...",
      },
      {
        id: 2,
        title: "Previous Report",
        content: "Content of a previous report...",
      },
      {
        id: 3,
        title: "Older Report",
        content: "Content of an older report...",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
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
          <span className="text-xl font-medium text-green-600">
            POINTS: {user.points}
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
