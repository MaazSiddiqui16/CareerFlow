import { useState } from "react";
import { Check, X } from "lucide-react";
import { statuses } from "./constants";

export function ApplicationForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      company: "",
      position: "",
      date: new Date().toISOString().slice(0, 10),
      status: "Applied",
      location: "",
    },
  );
  const [error, setError] = useState("");
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    if (!form.company || !form.position || !form.date || !form.location)
      return setError("Complete every field before saving.");
    onSave(form);
  };
  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">
              {initial ? "Edit opportunity" : "New opportunity"}
            </p>
            <h2>{initial ? "Update application" : "Add application"}</h2>
          </div>
          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>
        <label>
          Company
          <input
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="e.g. Acme Corp"
          />
        </label>
        <label>
          Position
          <input
            value={form.position}
            onChange={(event) => update("position", event.target.value)}
            placeholder="e.g. Product Manager"
          />
        </label>
        <div className="form-row">
          <label>
            Date applied
            <input
              type="date"
              value={form.date}
              onChange={(event) => update("date", event.target.value)}
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
            >
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Location
          <input
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="e.g. Remote"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="primary-button">
            <Check size={15} /> Save application
          </button>
        </div>
      </form>
    </div>
  );
}
