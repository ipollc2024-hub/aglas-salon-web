"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface Props {
  total: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1A1A1A",
      fontFamily: "Montserrat, sans-serif",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#e53e3e" },
  },
};

export default function StripeCheckoutForm({ total, onSuccess, onError }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      (window as any).__stripeClientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      },
    );

    if (error) {
      onError(error.message || "Error al procesar el pago");
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <CardElement options={cardStyle} />
      </div>
      <p className="text-xs text-gray-400 text-center">
        Pago seguro procesado por Stripe. No almacenamos datos de tarjeta.
      </p>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#C9A96E] hover:bg-[#B8955A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-full text-sm font-semibold transition-all"
      >
        {loading ? "PROCESANDO..." : `Pagar $${total} con Tarjeta`}
      </button>
    </form>
  );
}
