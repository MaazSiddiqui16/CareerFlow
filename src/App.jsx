import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Analytics } from "./Components/Analytics";
import { ApplicationForm } from "./Components/ApplicationForm";
import { Applications } from "./Components/Applications";
import { Calendar } from "./Components/Calendar";
import { Dashboard } from "./Components/Dashboard";
import { AppLayout } from "./Components/Layout";
import { Profile } from "./Components/Profile";
import { Toast } from "./Components/Toast";
import { Tracker } from "./Components/Tracker";
import { STORAGE_KEY } from "./Components/constants";

const seedApplications = [
  {
    id: 1,
    company: "Acme Corp",
    position: "Product Manager",
    date: "2026-09-04",
    status: "Interview",
    location: "New York, NY",
  },
  {
    id: 2,
    company: "Northstar Labs",
    position: "Growth Marketing Lead",
    date: "2026-09-02",
    status: "Applied",
    location: "Remote",
  },
  {
    id: 3,
    company: "Lumina Health",
    position: "Operations Manager",
    date: "2026-08-28",
    status: "Offer",
    location: "Boston, MA",
  },
  {
    id: 4,
    company: "Greenhouse Studio",
    position: "Brand Strategist",
    date: "2026-08-22",
    status: "Applied",
    location: "Remote",
  },
  {
    id: 5,
    company: "Vertex Finance",
    position: "Customer Success Lead",
    date: "2026-08-16",
    status: "Rejected",
    location: "Chicago, IL",
  },
  {
    id: 6,
    company: "Cedar & Co.",
    position: "Product Designer",
    date: "2026-08-10",
    status: "Applied",
    location: "Austin, TX",
  },
];

function loadApplications() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedApplications;
  } catch {
    return seedApplications;
  }
}

function App() {
  const [items, setItems] = useState(loadApplications);
  const [page, setPage] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(
    () => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)),
    [items],
  );

  const stats = useMemo(
    () => ({
      total: items.length,
      interviews: items.filter((item) => item.status === "Interview").length,
      offers: items.filter((item) => item.status === "Offer").length,
      response: items.length
        ? Math.round(
            (items.filter((item) =>
              ["Interview", "Offer"].includes(item.status),
            ).length /
              items.length) *
              100,
          )
        : 0,
    }),
    [items],
  );

  const visibleApplications = items.filter(
    (item) =>
      `${item.company} ${item.position}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (filter === "All" || item.status === filter),
  );
  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };
  const openNewForm = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const saveApplication = (form) => {
    setItems((current) =>
      editing
        ? current.map((item) =>
            item.id === editing.id ? { ...form, id: item.id } : item,
          )
        : [{ ...form, id: Date.now() }, ...current],
    );
    setFormOpen(false);
    setEditing(null);
    notify(editing ? "Application updated" : "Application added");
  };
  const removeApplication = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
    notify("Application removed");
  };
  const updateStatus = (id, status) =>
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

  return (
    <>
      <AppLayout
        page={page}
        setPage={setPage}
        query={query}
        setQuery={setQuery}
      >
        {page === "dashboard" && (
          <Dashboard stats={stats} items={items} onAdd={openNewForm} />
        )}
        {page === "applications" && (
          <Applications
            items={visibleApplications}
            total={items.length}
            query={query}
            setQuery={setQuery}
            filter={filter}
            setFilter={setFilter}
            onAdd={openNewForm}
            onEdit={(item) => {
              setEditing(item);
              setFormOpen(true);
            }}
            onDelete={removeApplication}
            onStatus={updateStatus}
          />
        )}
        {page === "tracker" && (
          <Tracker items={items} onStatus={updateStatus} />
        )}
        {page === "calendar" && <Calendar items={items} />}
        {page === "analytics" && <Analytics items={items} stats={stats} />}
        {page === "profile" && (
          <Profile items={items} onClear={() => setItems([])} />
        )}
      </AppLayout>
      {formOpen && (
        <ApplicationForm
          initial={editing}
          onSave={saveApplication}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}
      <Toast message={toast} />
    </>
  );
}

export default App;
