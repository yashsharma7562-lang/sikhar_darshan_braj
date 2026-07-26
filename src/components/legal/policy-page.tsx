import { Link } from "@/i18n/navigation";

export type PolicySection = {
  title: string;
  paragraphs: readonly string[];
};

export function PolicyPage({
  eyebrow,
  title,
  introduction,
  sections,
  updatedLabel,
  helpLabel,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: readonly PolicySection[];
  updatedLabel: string;
  helpLabel: string;
}) {
  return (
    <section className="container-shell py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-primary-deep text-sm font-bold tracking-widest uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">{title}</h1>
        <p className="text-muted mt-5 max-w-3xl text-base leading-7">
          {introduction}
        </p>
        <p className="bg-sand text-peacock-deep mt-5 inline-flex rounded-full px-4 py-2 text-xs font-bold">
          {updatedLabel}
        </p>
        <div className="mt-10 space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border bg-white p-6 md:p-8"
            >
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="text-muted mt-4 space-y-3 text-sm leading-7">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/help"
          className="bg-peacock-deep mt-8 inline-flex min-h-12 items-center rounded-xl px-5 font-bold text-white"
        >
          {helpLabel}
        </Link>
      </div>
    </section>
  );
}
