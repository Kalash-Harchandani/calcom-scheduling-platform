import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  duration: 30,
};

const EventTypes = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/events");
      const payload = res.data && typeof res.data === "object"
        ? res.data.data ?? res.data
        : res.data;
      setEvents(Array.isArray(payload) ? payload : []);
    } catch (err) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const slugify = (value) =>
    value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const openEdit = (event) => {
    setEditingId(event.id || event._id);
    setForm({
      title: event.title || "",
      slug: event.slug || slugify(event.title || ""),
      description: event.description || "",
      duration: event.duration || 30,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "title") {
        return {
          ...prev,
          title: value,
          slug: slugify(value),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/events/${editingId}`, form);
      } else {
        await axios.post("/api/events", form);
      }
      setModalOpen(false);
      await loadEvents();
    } catch (err) {
      // could show toast
    }
  };

  const handleDelete = async (event) => {
    const id = event.id || event._id;
    if (!id) return;
    try {
      await axios.delete(`/api/events/${id}`);
      await loadEvents();
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Event types</h2>
        <button
          onClick={openCreate}
          className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-sm hover:bg-neutral-200"
        >
          New event type
        </button>
      </div>

      {loading ? (
        <p className="text-xs text-[#a1a1aa]">Loading events…</p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-xs text-[#a1a1aa]">
          No event types yet. Create your first one to start accepting bookings.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id || event._id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {event.title || event.name}
                </h3>
                <p className="mt-1 text-xs text-[#a1a1aa]">
                  {event.description || "No description provided."}
                </p>
                <p className="mt-2 text-xs text-[#a1a1aa]">
                  Duration:{" "}
                  <span className="text-white">
                    {event.duration || form.duration} min
                  </span>
                </p>
                {event.slug && (
                  <p className="mt-1 text-[11px] text-[#6e6e73]">
                    <a
                      href={`/book/${event.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-dotted underline-offset-2"
                    >
                      {window.location.origin}/book/{event.slug}
                    </a>
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-2 text-xs">
                <button
                  onClick={() => openEdit(event)}
                  className="flex-1 rounded-full border border-white/20 px-3 py-1 text-center font-medium hover:bg-white/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event)}
                  className="flex-1 rounded-full border border-red-500/40 px-3 py-1 text-center font-medium text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#050509] p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white">
              {editingId ? "Edit event type" : "Create event type"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="mb-1 block text-[#a1a1aa]">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-white/40"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-[#a1a1aa]">
                  Booking link (auto‑generated)
                </label>
                <div className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[11px] text-[#a1a1aa]">
                  {window.location.origin}/book/
                  <span className="text-white">
                    {form.slug || "your-event"}
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[#a1a1aa]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-white/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-[#a1a1aa]">Duration</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="5"
                    step="5"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-24 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-white/40"
                  />
                  <span className="text-[#6e6e73]">minutes</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-[#e5e5e5] hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black hover:bg-neutral-200"
                >
                  {editingId ? "Save changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTypes;

