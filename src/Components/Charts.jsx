import { PanelTitle } from "./Shared";
import { statuses, statusColors } from "./constants";

export function ActivityChart({ items }) {
  return (
    <div className="panel">
      <PanelTitle title="Application activity" text="Applications submitted over the last 6 months." />
      <div className="line-chart">
        <div className="chart-y"><span>40</span><span>20</span><span>0</span></div>
        <div className="chart-area">
          <svg viewBox="0 0 600 180" preserveAspectRatio="none">
            <path d="M0 140 C80 110 100 145 160 115 S245 132 300 88 S395 30 450 62 S520 20 600 55" />
            <path className="area" d="M0 140 C80 110 100 145 160 115 S245 132 300 88 S395 30 450 62 S520 20 600 55 V180 H0 Z" />
          </svg>
          <div className="chart-labels">{["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month) => <span key={month}>{month}</span>)}</div>
        </div>
      </div>
      <small className="chart-note">{items.length} total applications · <span>↑ 18% vs last period</span></small>
    </div>
  );
}

export function StatusChart({ items }) {
  return (
    <div className="panel">
      <PanelTitle title="Applications by status" text="Pipeline health at a glance." />
      <div className="donut-wrap">
        <div className="donut"><div><strong>{items.length}</strong><small>Total</small></div></div>
        <div className="legend">{statuses.map((status) => <div key={status}><i style={{ background: statusColors[status] }} />{status}<b>{items.filter((item) => item.status === status).length}</b></div>)}</div>
      </div>
    </div>
  );
}
