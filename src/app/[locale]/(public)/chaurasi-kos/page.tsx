import { Accessibility, BedDouble, Map, ShieldAlert } from "lucide-react";
export default function ChaurasiKosPage() {
  return (
    <>
      <section className="bg-peacock-deep text-white">
        <div className="container-shell py-14 md:py-20">
          <p className="text-soft-gold text-sm font-bold tracking-widest uppercase">
            Braj Chaurasi Kos Yatra
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black md:text-5xl">
            Plan this sacred journey only with verified stages and current local
            guidance.
          </h1>
          <p className="mt-5 max-w-3xl text-white/80">
            The platform will support stage-by-stage routes, safety resources,
            suitable stays, offline guidance, progress and family sharing. It
            does not currently publish a complete route because no stage set has
            passed source verification.
          </p>
        </div>
      </section>
      <section className="container-shell py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            [
              Map,
              "Route stages",
              "No route geometry or distance is shown until sourced and reviewed.",
            ],
            [
              ShieldAlert,
              "Safety points",
              "Medical, police, water and rest points require current verification.",
            ],
            [
              BedDouble,
              "Accommodation",
              "Availability is never inferred from a place appearing near the route.",
            ],
            [
              Accessibility,
              "Physical readiness",
              "Walking effort, terrain, weather and accessibility must be assessed stage by stage.",
            ],
          ].map(([Icon, title, text]) => {
            const ItemIcon = Icon as typeof Map;
            return (
              <article
                key={title as string}
                className="rounded-2xl border bg-white p-6"
              >
                <ItemIcon className="text-primary-deep" />
                <h2 className="mt-4 text-xl font-black">{title as string}</h2>
                <p className="text-muted mt-3 text-sm">{text as string}</p>
              </article>
            );
          })}
        </div>
        <div className="bg-sand mt-7 rounded-2xl p-6">
          <h2 className="font-black">Verification pending</h2>
          <p className="text-muted mt-2 text-sm">
            No complete Chaurasi Kos route, safety-point set, accommodation
            list, or distance total is currently published. Seek current
            official and experienced local guidance before undertaking the
            journey.
          </p>
        </div>
      </section>
    </>
  );
}
