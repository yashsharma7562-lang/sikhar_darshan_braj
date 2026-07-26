export default function DashboardLoading() {
  return (
    <div className="container-shell py-16" role="status">
      <div className="bg-sand h-40 animate-pulse rounded-3xl" />
      <p className="text-muted mt-4 text-sm">Loading your private dashboard…</p>
    </div>
  );
}
