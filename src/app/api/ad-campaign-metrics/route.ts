import { metrics } from "@/shared/metrics";
import { NextResponse } from "next/server";

// Handler function to handle GET requests
export async function GET() {
  return NextResponse.json({ metrics });
}
