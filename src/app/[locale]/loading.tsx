export default function Loading() {
  return (
    <div className="container-shell py-24" role="status" aria-live="polite">
      <div className="mx-auto max-w-3xl animate-pulse space-y-5">
        <div className="bg-sand h-7 w-48 rounded-full" />
        <div className="bg-sand h-14 rounded-2xl" />
        <div className="bg-sand h-6 w-4/5 rounded-xl" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
