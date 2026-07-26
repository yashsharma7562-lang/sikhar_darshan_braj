import { AccessibilityControls } from "@/components/accessibility/accessibility-controls";
export default function AccessibilityPage() {
  return (
    <section className="container-shell py-12 md:py-16">
      <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
        Senior and accessibility experience
      </p>
      <h1 className="mt-3 text-4xl font-black">
        Make the interface easier to use
      </h1>
      <p className="text-muted mt-4 max-w-3xl">
        These device preferences are stored only in this browser. They do not
        disclose a health condition or request a service.
      </p>
      <div className="mt-8">
        <AccessibilityControls />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Verified accessibility only</h2>
          <p className="text-muted mt-3 text-sm">
            Stay and transport filters require an explicitly verified facility.
            Unknown is never treated as accessible.
          </p>
        </article>
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Slow-paced planning</h2>
          <p className="text-muted mt-3 text-sm">
            Senior-friendly drafts add rest time and keep route duration,
            terrain and facilities unresolved until verified.
          </p>
        </article>
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Assistance requests</h2>
          <p className="text-muted mt-3 text-sm">
            A request is not a confirmation. Providers must explicitly accept
            wheelchair, mobility or caregiver support.
          </p>
        </article>
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-black">Emergency shortcuts</h2>
          <p className="text-muted mt-3 text-sm">
            Destination-specific contacts appear only after source verification.
            No contact list is currently published.
          </p>
        </article>
      </div>
    </section>
  );
}
