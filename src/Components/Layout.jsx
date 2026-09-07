import { Bell, Calendar as CalendarIcon, CircleHelp, ChevronDown, FileText, BarChart3, CalendarDays, KanbanSquare, LayoutDashboard, Menu, Search, Settings, TrendingUp, UserRound } from "lucide-react";

const navigation = [
  ["dashboard", "Overview", LayoutDashboard],
  ["applications", "Applications", FileText],
  ["tracker", "Tracker", KanbanSquare],
  ["calendar", "Calendar", CalendarDays],
  ["analytics", "Analytics", BarChart3],
  ["profile", "Profile", UserRound],
];

export function AppLayout({ page, setPage, query, setQuery, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><img src="/assets/CareerFlow_Light_1.png" alt="CareerFlow" /></div>
        <div className="journey"><b><TrendingUp size={16} /></b><div><strong>Job Journey</strong><small>Your next move starts here.</small></div></div>
        <nav>{navigation.map(([id, label, Icon]) => <button key={id} className={page === id ? "nav-item active" : "nav-item"} onClick={() => setPage(id)}><span><Icon size={17} strokeWidth={1.8} /></span>{label}</button>)}</nav>
        <div className="sidebar-bottom"><button className="nav-item"><span><Settings size={17} strokeWidth={1.8} /></span>Settings</button><button className="nav-item"><span><CircleHelp size={17} strokeWidth={1.8} /></span>Help</button></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open navigation"><Menu size={20} /></button><div className="search-wrap"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs, companies, or keywords..." /></div><div className="top-actions"><button aria-label="Notifications"><Bell size={18} /><i>3</i></button><button aria-label="Open calendar"><CalendarIcon size={18} /></button><div className="avatar">AM</div><div className="user-name"><strong>Alex Morgan</strong><small>Career Explorer</small></div><ChevronDown size={16} /></div></header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
