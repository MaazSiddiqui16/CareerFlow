import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  FileText,
  Gift,
  Plus,
  TrendingUp,
} from "lucide-react";
import { PageHeader, PanelTitle } from "./Shared";
import { ActivityChart, StatusChart } from "./Charts";
import { statuses, statusColors } from "./constants";

export function Dashboard({ stats, items, onAdd }) {
  const statCards = [
    ["Applications", stats.total, "+12% this month", FileText],
    ["Interviews", stats.interviews, "+8% this month", CalendarIcon],
    ["Offers", stats.offers, "+4% this month", Gift],
    ["Response rate", `${stats.response}%`, "+6% this month", TrendingUp],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Monday, September 7, 2026"
        title="Welcome back, Alex 👋"
        description="Here's what's happening with your career journey."
        action={
          <button className="primary-button" onClick={onAdd}>
            <Plus size={15} /> Add goal
          </button>
        }
      />
      <div className="stats-grid">
        {statCards.map(([label, value, delta, Icon]) => (
          <div className="stat-card" key={label}>
            <div className="stat-top">
              <span>{label}</span>
              <b>
                <Icon size={17} />
              </b>
            </div>
            <strong>{value}</strong>
            <small className="positive">↑ {delta}</small>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <ActivityChart items={items} />
        <StatusChart items={items} />
      </div>
      <div className="dashboard-grid lower">
        <div className="panel">
          <PanelTitle
            title="Application funnel"
            text="Move every opportunity forward."
          />
          {statuses.map((status) => (
            <div className="funnel-row" key={status}>
              <span>{status}</span>
              <div>
                <i
                  style={{
                    width: `${Math.max(8, (items.filter((item) => item.status === status).length / Math.max(items.length, 1)) * 100)}%`,
                    background: statusColors[status],
                  }}
                />
              </div>
              <strong>
                {items.filter((item) => item.status === status).length}
              </strong>
            </div>
          ))}
        </div>
        <div className="panel">
          <PanelTitle
            title="Recent activity"
            text="Your latest application momentum."
          />
          {items.slice(0, 3).map((item) => (
            <div className="activity-row" key={item.id}>
              <b style={{ color: statusColors[item.status] }}>
                <ArrowUpRight size={16} />
              </b>
              <div>
                <strong>
                  {item.status} at {item.company}
                </strong>
                <small>
                  {item.position} · {item.location}
                </small>
              </div>
              <i style={{ background: statusColors[item.status] }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
