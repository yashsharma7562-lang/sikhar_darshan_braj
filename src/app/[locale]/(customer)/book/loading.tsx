export default function BookingLoading() {
  return (
    <div className="container-shell py-16" role="status">
      <div className="bg-sand h-96 animate-pulse rounded-3xl" />
      <p className="text-muted mt-4 text-sm">Preparing secure booking…</p>
    </div>
  );
}
