"use client";
import { useState } from "react";
const steps = [
  "Choose service",
  "Travellers",
  "Preferences",
  "Review",
  "Confirmation",
] as const;
export function BookingFlow() {
  const [step, setStep] = useState(0);
  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <ol className="space-y-2" aria-label="Booking progress">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={index === step ? "step" : undefined}
            className={
              index === step
                ? "bg-peacock-deep rounded-xl p-4 font-bold text-white"
                : "text-muted rounded-xl border bg-white p-4 text-sm"
            }
          >
            <span className="mr-2">{index + 1}.</span>
            {label}
          </li>
        ))}
      </ol>
      <section className="rounded-3xl border bg-white p-7 md:p-10">
        <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
          Step {step + 1} of 5
        </p>
        <h2 className="mt-3 text-3xl font-black">{steps[step]}</h2>
        {step === 0 ? (
          <>
            <p className="text-muted mt-4">
              Begin from a verified stay, transport option, or package. No
              verified bookable inventory is currently connected.
            </p>
            <div className="bg-sand mt-6 rounded-xl p-4 text-sm">
              Checkout remains disabled until the server can recalculate price
              and create a transactional inventory hold.
            </div>
          </>
        ) : (
          <p className="text-muted mt-4">
            This step becomes available after a verified service is selected.
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            className="min-h-11 rounded-xl border px-5 font-bold disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            disabled
            className="bg-primary-deep min-h-11 rounded-xl px-5 font-bold text-white opacity-50"
          >
            Continue after inventory verification
          </button>
        </div>
      </section>
    </div>
  );
}
