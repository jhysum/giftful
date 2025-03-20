"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DateCountdown from "./date-countdown";

type ImportantDate = {
  id: string;
  event_type: string;
  date: string;
  contact: {
    id: string;
    name: string;
  };
  days_until: number;
};

export default function UpcomingDates() {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDates() {
      const { data: user } = await supabase.auth.getUser();

      if (!user.user) return;

      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const { data, error } = await supabase
        .from("important_dates")
        .select(
          `
          id,
          event_type,
          date,
          contact:contacts(id, name)
        `
        )
        .eq("user_id", user.user.id)
        .order("date");

      if (error) {
        console.error("Error fetching dates:", error);
        return;
      }

      // Calculate days until each date
      const processedDates = data
        .map((date) => {
          const eventDate = new Date(date.date);
          const today = new Date();

          // Adjust for this year's date
          const currentYear = today.getFullYear();
          eventDate.setFullYear(currentYear);

          // If the date has passed this year, use next year's date
          if (eventDate < today) {
            eventDate.setFullYear(currentYear + 1);
          }

          return {
            ...date,
            days_until: differenceInDays(eventDate, today),
          };
        })
        .filter((date) => date.days_until <= 30)
        .sort((a, b) => a.days_until - b.days_until);

      setDates(processedDates);
      setLoading(false);
    }

    fetchDates();
  }, []);

  if (loading) return <p>Loading upcoming dates...</p>;

  if (dates.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground mb-4">
            No upcoming events in the next 30 days.
          </p>
          <div className="flex justify-center">
            <Link href="/contacts/add">
              <Button>Add a Contact</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {dates.map((date) => (
        <Card key={date.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between">
              <span>
                {date.contact.name} - {date.event_type}
              </span>
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                {date.days_until === 0 ? "Today!" : `${date.days_until} days`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {format(new Date(date.date), "MMMM d")}
            </p>
            <DateCountdown daysUntil={date.days_until} />
            <div className="mt-4">
              <Link href={`/contacts/${date.contact.id}`}>
                <Button variant="outline" size="sm">
                  View Gift Ideas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
