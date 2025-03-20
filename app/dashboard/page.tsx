import { Suspense } from "react";
import UpcomingDates from "@/components/dashboard/upcoming-dates";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <UpcomingDates />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
