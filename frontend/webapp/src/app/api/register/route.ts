import { API_ENDPOINTS } from "@/constants";
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
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid request: email and password are required" },
        { status: 400 }
      );
    }

    // logic
    const supabase = createClient();
    const origin = headers().get("origin");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}${API_ENDPOINTS.AUTH_CALLBACK}`
      }
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to sign up: " + error.message }, { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
