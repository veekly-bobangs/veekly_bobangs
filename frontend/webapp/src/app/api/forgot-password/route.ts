import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json(
      { error: "Invalid request: body is required" },
      { status: 400 }
    );
  }

  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: "Invalid request: email is required" },
        { status: 400 }
      );
    }

    // logic
    const supabase = createClient();
    const origin = headers().get("origin");
    await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${origin}/` } //TODO: make profile page
    );
    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}