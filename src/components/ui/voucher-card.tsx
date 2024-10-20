import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VoucherCard() {
  const [points, setPoints] = useState(253);
  return (
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
  );
}
