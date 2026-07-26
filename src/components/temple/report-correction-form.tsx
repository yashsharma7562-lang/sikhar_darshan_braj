"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";
export function ReportCorrectionForm({ templeSlug }: { templeSlug: string }) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/temples/corrections", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        templeSlug,
        field: form.get("field"),
        correction: form.get("correction"),
        sourceUrl: form.get("sourceUrl"),
      }),
    });
    const body = (await response.json()) as { message?: string };
    setState(response.ok ? "success" : "error");
    setMessage(body.message ?? "The report could not be submitted.");
    if (response.ok) event.currentTarget.reset();
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="field" className="text-sm font-extrabold">
          Information to correct
        </label>
        <select
          id="field"
          name="field"
          required
          className="mt-2 min-h-12 w-full rounded-xl border bg-white px-3"
        >
          <option value="">Choose a field</option>
          <option value="schedule">Schedule</option>
          <option value="facility">Facility</option>
          <option value="contact">Official contact</option>
          <option value="notice">Notice or closure</option>
          <option value="other">Other information</option>
        </select>
      </div>
      <div>
        <label htmlFor="correction" className="text-sm font-extrabold">
          What should be updated?
        </label>
        <textarea
          id="correction"
          name="correction"
          required
          minLength={20}
          maxLength={1000}
          rows={4}
          className="mt-2 w-full rounded-xl border p-3"
        />
      </div>
      <div>
        <label htmlFor="sourceUrl" className="text-sm font-extrabold">
          Source link, if available
        </label>
        <input
          id="sourceUrl"
          name="sourceUrl"
          type="url"
          className="mt-2 min-h-12 w-full rounded-xl border px-3"
          placeholder="https://"
        />
      </div>
      <button
        disabled={state === "submitting"}
        className="bg-peacock-deep inline-flex min-h-12 items-center gap-2 rounded-xl px-5 font-extrabold text-white disabled:opacity-60"
      >
        <Send size={17} />
        {state === "submitting" ? "Submitting…" : "Submit for review"}
      </button>
      {message ? (
        <p
          role="status"
          className={state === "success" ? "text-success" : "text-error"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
