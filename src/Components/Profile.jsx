import { Pencil } from "lucide-react";
import { PageHeader } from "./Shared";

export function Profile({ items, onClear }) {
  return <><PageHeader eyebrow="Your preferences" title="Profile" description="Keep your workspace focused and personal." /><div className="profile-layout"><div className="panel profile-card"><div className="profile-avatar">AM</div><h2>Alex Morgan</h2><p>Career Explorer</p><button className="secondary-button"><Pencil size={14} /> Edit profile</button></div><div className="panel settings-card"><h2>Data management</h2><p>Your data lives privately in this browser. CareerFlow currently stores {items.length} applications locally.</p><div className="setting-row"><div><strong>Local storage</strong><small>Automatically saved on every change</small></div><span className="status-live">Active</span></div><button className="danger-button" onClick={onClear}>Clear all application data</button></div></div></>;
}
