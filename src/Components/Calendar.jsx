import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "./Shared";
import { statusColors } from "./constants";

export function Calendar({ items }) {
  return <><PageHeader eyebrow="Plan ahead" title="Calendar" description="Your application dates and upcoming moments." /><div className="panel calendar-panel"><div className="calendar-header"><button aria-label="Previous month"><ChevronLeft size={16} /></button><h2>September 2026</h2><button aria-label="Next month"><ChevronRight size={16} /></button></div><div className="calendar-grid">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <b key={day}>{day}</b>)}{Array.from({ length: 35 }, (_, index) => { const day = index - 1; const item = items.find((application) => new Date(application.date).getDate() === day); return <div className={item ? "day has-event" : "day"} key={index}>{day > 0 && day <= 30 ? day : ""}{item && <i style={{ background: statusColors[item.status] }} title={item.company} />}</div> })}</div></div></>;
}
