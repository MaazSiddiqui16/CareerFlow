import { PageHeader } from "./Shared";
import { statuses, statusColors } from "./constants";

export function Tracker({ items, onStatus }) {
  return <><PageHeader eyebrow="Keep moving" title="Application tracker" description="A clear view of every stage in your search." /><div className="kanban">{statuses.map((status) => <div className="kanban-column" key={status}><div className="column-heading"><h2>{status}</h2><span style={{ color: statusColors[status], background: `${statusColors[status]}20` }}>{items.filter((item) => item.status === status).length}</span></div>{items.filter((item) => item.status === status).map((item) => <div className="mini-card" key={item.id}><strong>{item.position}</strong><span>{item.company}</span><small>{item.location}</small><select value={item.status} onChange={(event) => onStatus(item.id, event.target.value)}>{statuses.map((value) => <option key={value}>{value}</option>)}</select></div>)}</div>)}</div></>;
}
