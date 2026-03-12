import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, ExternalLink, Link as LinkIcon, MoreHorizontal, Plus, Search } from "lucide-react";

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
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

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
    setOpenDropdownId(null);
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
    setOpenDropdownId(null);
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

  const handleCopyLink = (slug) => {
    const link = `${window.location.origin}/book/${slug}`;
    navigator.clipboard.writeText(link);
    setToastMessage("Link copied!");
    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  return (
    <div className="space-y-6 text-white pb-10">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white mb-1">Event types</h2>
          <p className="text-sm text-[#a1a1aa]">Configure different events for people to book on your calendar.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-sm text-[#a1a1aa]">
            <Search className="w-4 h-4" />
            <input type="text" placeholder="Search" className="bg-transparent outline-none ring-0 focus:ring-0 max-w-[120px]" />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black shadow-sm hover:bg-neutral-200"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-[#a1a1aa]">Loading events…</p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-xs text-[#a1a1aa]">
          No event types yet. Create your first one to start accepting bookings.
        </div>
      ) : (
        <div className="flex flex-col gap-0 rounded-xl border border-white/10 bg-[#111111]">
          {events.map((event) => (
            <article
              key={event.id || event._id}
              className="flex flex-col justify-between border-b border-white/10 last:border-0 p-4 md:flex-row md:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {event.title || event.name}
                  <span className="font-normal text-[#a1a1aa] ml-1">
                    /{window.location.host.includes('localhost') ? 'kalash' : 'admin'}/{event.slug || "event"}
                  </span>
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-[#a1a1aa]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.duration || form.duration}m</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs md:mt-0">
                <div className="flex items-center rounded-md border border-white/10 bg-transparent">
                  <a
                    href={`/book/${event.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Preview booking page"
                    className="group relative flex h-8 w-9 items-center justify-center border-r border-white/10 text-[#a1a1aa] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-[#111111] border border-white/10 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                      Book slot
                    </span>
                  </a>
                  <button
                    onClick={() => handleCopyLink(event.slug)}
                    title="Copy link"
                    className="group relative flex h-8 w-9 items-center justify-center border-r border-white/10 text-[#a1a1aa] transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-[#111111] border border-white/10 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                      Copy link
                    </span>
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === (event.id || event._id) ? null : (event.id || event._id))}
                      className="flex h-8 w-9 items-center justify-center text-[#a1a1aa] transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openDropdownId === (event.id || event._id) && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenDropdownId(null)} 
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 w-32 overflow-hidden rounded-lg border border-white/10 bg-[#111111] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                          <button
                            onClick={() => openEdit(event)}
                            className="block w-full px-4 py-2 text-left text-xs font-medium text-white hover:bg-white/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(event);
                              setOpenDropdownId(null);
                            }}
                            className="block w-full px-4 py-2 text-left text-xs font-medium text-red-400 hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-sm font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <LinkIcon className="h-4 w-4 text-[#a1a1aa]" />
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default EventTypes;

