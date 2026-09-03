import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Los pagos y las reservas se gestionan actualmente mediante Booksy." },
    { status: 410 },
  );
}
