import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Implement notification logic
  return NextResponse.json({ message: "Notifications sent" });
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();

    // Find dates occurring 7 days from now
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const formattedDate = sevenDaysFromNow.toISOString().split("T")[0];

    // Get all important dates occurring 7 days from now
    const { data, error } = await supabase
      .from("important_dates")
      .select(
        `
        id,
        event_type,
        date,
        contacts(name),
        user_id
      `
      )
      .eq("date", formattedDate);

    if (error) {
      console.error("Error fetching upcoming dates:", error);
      return NextResponse.json(
        { error: "Failed to fetch upcoming dates" },
        { status: 500 }
      );
    }

    // Group by user_id for batched emails
    const userNotifications: Record<
      string,
      {
        email: string;
        dates: Array<{ name: string; event: string; date: string }>;
      }
    > = {};

    for (const date of data || []) {
      if (!userNotifications[date.user_id]) {
        // Get user email
        const { data: user } = await supabase
          .from("users")
          .select("email")
          .eq("id", date.user_id)
          .single();

        if (user) {
          userNotifications[date.user_id] = {
            email: user.email,
            dates: [],
          };
        }
      }

      if (userNotifications[date.user_id]) {
        userNotifications[date.user_id].dates.push({
          name: date.contacts.name,
          event: date.event_type,
          date: date.date,
        });
      }
    }

    // Here you would typically send emails using your email service
    // For now, we'll just return the notifications
    return NextResponse.json({
      notifications: Object.values(userNotifications),
    });
  } catch (error) {
    console.error("Error processing notifications:", error);
    return NextResponse.json(
      { error: "Failed to process notifications" },
      { status: 500 }
    );
  }
}
