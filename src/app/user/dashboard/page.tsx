"use client";

import Footer from "@/components/Footer";
import ScheduleCard from "@/components/ui/schedule-card";
import WasteDistribution from "@/components/ui/pie-chart";
import Reportcard from "@/components/ui/report-card";
import VoucherCard from "@/components/ui/voucher-card";
import GreenInsightsCard from "@/components/ui/green-insights";
import GovtSitesCard from "@/components/ui/govt-sites";
import CollectionSummary from "@/components/ui/collection-summary";
import Navbar from "@/components/ui/navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground w-full pt-64">
      <main className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Navbar></Navbar>
          <ScheduleCard></ScheduleCard>
          <WasteDistribution></WasteDistribution>
          <Reportcard></Reportcard>
          <VoucherCard></VoucherCard>
          <GovtSitesCard></GovtSitesCard>
          <GreenInsightsCard></GreenInsightsCard>
          <CollectionSummary></CollectionSummary>
          <Footer></Footer>
        </div>
      </main>
    </div>
  );
}
