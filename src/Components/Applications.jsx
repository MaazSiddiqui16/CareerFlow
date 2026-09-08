import {
  CalendarDays,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { PageHeader } from "./Shared";
import { statuses, statusColors } from "./constants";

export function Applications({
  items,
  total,
  query,
  setQuery,
  filter,
  setFilter,
  onAdd,
  onEdit,
  onDelete,
  onStatus,
}) {
  return (
    <>
      <PageHeader
        eyebrow="Your pipeline"
        title="Applications"
        description={`${total} opportunities in your career journey.`}
        action={
          <button className="primary-button" onClick={onAdd}>
            <Plus size={15} /> Add application
          </button>
        }
      />
      <div className="toolbar">
        <div className="inline-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company or position"
          />
        </div>
        <div className="filter-group">
          {["All", ...statuses].map((status) => (
            <button
              key={status}
              className={filter === status ? "filter active" : "filter"}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {items.length ? (
        <div className="application-grid">
          {items.map((item) => (
            <ApplicationCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatus={onStatus}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>
            <Search size={24} />
          </span>
          <h2>No applications found</h2>
          <p>Try a different search or add your next opportunity.</p>
          <button className="primary-button" onClick={onAdd}>
            Add application
          </button>
        </div>
      )}
    </>
  );
}

function ApplicationCard({ item, onEdit, onDelete, onStatus }) {
  return (
    <article className="application-card">
      <div className="card-top">
        <div className="company-logo">{item.company[0]}</div>
        <button className="more-button" aria-label="More application actions">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <h2>{item.position}</h2>
      <p className="company-name">{item.company}</p>
      <div className="card-meta">
        <span>
          <MapPin size={13} /> {item.location}
        </span>
        <span>
          <CalendarDays size={13} />{" "}
          {new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="card-footer">
        <select
          className="status-select"
          value={item.status}
          onChange={(event) => onStatus(item.id, event.target.value)}
          style={{
            color: statusColors[item.status],
            background: `${statusColors[item.status]}18`,
          }}
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <div>
          <button
            className="icon-button"
            onClick={() => onEdit(item)}
            aria-label={`Edit ${item.position}`}
          >
            <Pencil size={15} />
          </button>
          <button
            className="icon-button danger"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete ${item.position}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
