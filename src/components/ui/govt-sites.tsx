import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GovtSitesCard() {
  return (
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
  );
}
