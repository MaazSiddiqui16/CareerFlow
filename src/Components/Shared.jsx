import { ArrowUpRight } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subhead">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function PanelTitle({ title, text }) {
  return (
    <div className="panel-heading">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <button className="text-button">
        View all <ArrowUpRight size={13} />
      </button>
    </div>
  );
}
