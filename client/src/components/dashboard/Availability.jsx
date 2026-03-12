import React, { useEffect, useState } from "react";
import axios from "axios";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeOptions = Array.from({ length: 24 * 2 }, (_v, i) => {
  const totalMinutes = i * 30;
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

const Availability = () => {
  // Per-day state: { [day]: { id?, enabled, from, to } }
  const [availability, setAvailability] = useState({});
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState("list"); // "list" | "editor"

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const res = await axios.get("/api/availability");
        const data =
          res.data && typeof res.data === "object"
            ? res.data.data ?? res.data
            : res.data;

        const byDay = {};

        if (Array.isArray(data)) {
          for (const row of data) {
            const dayName =
              row.day_of_week?.charAt(0).toUpperCase() +
                row.day_of_week?.slice(1).toLowerCase() || "";
            if (!dayName) continue;
            byDay[dayName] = {
              id: row.id,
              enabled: true,
              from: row.start_time?.slice(0, 5) || "",
              to: row.end_time?.slice(0, 5) || "",
            };
          }
        }

        // ensure all days exist in state
        daysOfWeek.forEach((day) => {
          if (!byDay[day]) {
            byDay[day] = {
              id: null,
              enabled: false,
              from: "",
              to: "",
            };
          }
        });

        setAvailability(byDay);
      } catch (err) {
        // ignore
      }
    };

    loadAvailability();
  }, []);

  const handleChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const requests = [];

      for (const day of daysOfWeek) {
        const state = availability[day] || {};
        const day_of_week = day.toLowerCase();

        // convert "HH:MM" to "HH:MM:00"
        const start_time =
          state.from && state.from.length === 5
            ? `${state.from}:00`
            : state.from || null;
        const end_time =
          state.to && state.to.length === 5 ? `${state.to}:00` : state.to || null;

        if (state.enabled && start_time && end_time) {
          if (state.id) {
            // update existing slot
            requests.push(
              axios.put(`/api/availability/${state.id}`, {
                day_of_week,
                start_time,
                end_time,
              }),
            );
          } else {
            // create new slot
            requests.push(
              axios.post("/api/availability", {
                day_of_week,
                start_time,
                end_time,
              }),
            );
          }
        } else if (!state.enabled && state.id) {
          // delete disabled slot
          requests.push(axios.delete(`/api/availability/${state.id}`));
        }
      }

      if (requests.length > 0) {
        await Promise.all(requests);
      }
    } catch (err) {
      // ignore for now
    } finally {
      setSaving(false);
    }
  };

  // LIST VIEW: single implicit schedule card
  if (view === "list") {
    return (
      <div className="space-y-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Availability</h2>
        </div>

        <div
          className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 hover:border-white/30"
          onClick={() => setView("editor")}
        >
          <div>
            <p className="text-sm font-semibold text-white">Working hours</p>
            <p className="mt-1 text-xs text-[#a1a1aa]">
              Configure when you&apos;re available for bookings.
            </p>
          </div>
          <div className="text-right text-[11px] text-[#6e6e73]">
            <p>Mon – Fri, 9:00 AM – 5:00 PM (example)</p>
            <p className="mt-1">Asia/Kolkata</p>
          </div>
        </div>

        <p className="text-[11px] text-[#6e6e73]">
          Click &quot;Working hours&quot; to configure your weekly availability.
        </p>
      </div>
    );
  }

  // EDITOR VIEW: current per-day grid for the single schedule
  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className="mb-1 text-[11px] text-[#6e6e73] hover:text-[#e5e5e5]"
          >
            ← Back to schedules
          </button>
          <h2 className="text-lg font-semibold">Working hours</h2>
          <p className="text-xs text-[#a1a1aa]">
            Edit the times you&apos;re available each day.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-sm disabled:cursor-not-allowed disabled:bg-white/40"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <table className="w-full text-left text-xs text-[#a1a1aa]">
          <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => {
              const config = availability[day] || {
                enabled: false,
                from: "",
                to: "",
              };
              return (
                <tr key={day} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{day}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange(day, "enabled", !config.enabled)
                      }
                      className={`inline-flex h-5 w-9 items-center rounded-full border px-0.5 transition ${
                        config.enabled
                          ? "border-emerald-400 bg-emerald-500/30"
                          : "border-white/20 bg-white/5"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          config.enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={config.from || ""}
                      onChange={(e) =>
                        handleChange(day, "from", e.target.value)
                      }
                      disabled={!config.enabled}
                      className="w-32 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <option value="">--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={config.to || ""}
                      onChange={(e) =>
                        handleChange(day, "to", e.target.value)
                      }
                      disabled={!config.enabled}
                      className="w-32 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <option value="">--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-[#6e6e73]">
        Use the toggles to enable days and pick your working hours with the
        dropdowns. Changes are saved as simple daily ranges in the backend.
      </p>
    </div>
  );
};

export default Availability;

