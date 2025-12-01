import Content from "@/components/dashboard/content";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Competitive Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze your competitors across social media, websites,
            and market activities.
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <Content />
    </div>
  );
}
