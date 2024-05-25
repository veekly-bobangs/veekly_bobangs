import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json(
      { error: "Invalid request: body is required" },
      { status: 400 }
    );
  }

  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid request: email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to login: " + error.message },
        { status: typeof error.code === 'number' ? error.code : 500 }
      );
    }

    return NextResponse.json(
      { message: "User logged in successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
