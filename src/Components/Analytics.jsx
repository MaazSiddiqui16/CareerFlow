import { PageHeader } from "./Shared";
import { ActivityChart, StatusChart } from "./Charts";

export function Analytics({ items, stats }) {
  return (
    <>
      <PageHeader
        eyebrow="Measure momentum"
        title="Analytics"
        description="Understand the patterns behind your search."
      />
      <div className="stats-grid compact">
        {[
          ["Total applications", stats.total],
          ["Response rate", `${stats.response}%`],
          ["Offers earned", stats.offers],
          ["Interviews", stats.interviews],
        ].map(([label, value]) => (
          <div className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small className="positive">↑ trending up</small>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <ActivityChart items={items} />
        <StatusChart items={items} />
      </div>
    </>
  );
}
