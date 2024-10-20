import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table1";

export default function CollectionSummary() {
  return (
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
  );
}
