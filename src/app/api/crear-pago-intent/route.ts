import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { total, nombre, email } = await request.json();

    if (!total || total <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe no configurado" }, { status: 500 });
    }

    const stripe = require("stripe")(stripeKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      description: `Reserva AGLA'S SALÓN - ${nombre || "Cliente"}`,
      receipt_email: email || undefined,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err: any) {
    console.error("Error creando payment intent:", err);
    return NextResponse.json({ error: err.message || "Error al procesar pago" }, { status: 500 });
  }
}
