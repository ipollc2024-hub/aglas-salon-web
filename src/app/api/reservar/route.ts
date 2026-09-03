import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Las reservas se gestionan actualmente mediante Booksy." },
    { status: 410 },
  );
}
