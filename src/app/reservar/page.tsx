import BookingWizard from "@/components/BookingWizard";

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mb-4">
            Book Your Appointment
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Select your service, pick your specialist, choose your time — and leave the rest to us.
          </p>
        </div>
        <BookingWizard />
      </div>
    </div>
  );
}
