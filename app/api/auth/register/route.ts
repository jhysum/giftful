import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id, email, name } = await req.json();

    // Create a Supabase client with service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // First check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", user_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing user" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Insert the user into the users table
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ user_id, email, name }]);

    if (insertError) {
      console.error("Error creating user:", insertError);
      return NextResponse.json(
        { error: insertError.message || "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in register route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
