import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async (tab) => {
    setLoading(true);
    try {
      if (tab === "upcoming") {
        const res = await axios.get("/api/bookings/upcoming");
        const payload =
          res.data && typeof res.data === "object"
            ? res.data.data ?? res.data
            : res.data;
        setUpcoming(Array.isArray(payload) ? payload : []);
      } else {
        const res = await axios.get("/api/bookings/past");
        const payload =
          res.data && typeof res.data === "object"
            ? res.data.data ?? res.data
            : res.data;
        setPast(Array.isArray(payload) ? payload : []);
      }
    } catch (err) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings("upcoming");
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadBookings(tab);
  };

  const handleCancel = async (booking) => {
    const id = booking.id || booking._id;
    if (!id) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      await loadBookings("upcoming");
    } catch (err) {
      // ignore
    }
  };

  const items = activeTab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-semibold">Bookings</h2>

      <div className="inline-flex rounded-full border border-white/10 bg-white/[0.02] p-1 text-xs">
        <button
          onClick={() => handleTabChange("upcoming")}
          className={`rounded-full px-3 py-1.5 ${
            activeTab === "upcoming"
              ? "bg-white text-black"
              : "text-[#a1a1aa] hover:bg-white/5"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleTabChange("past")}
          className={`rounded-full px-3 py-1.5 ${
            activeTab === "past"
              ? "bg-white text-black"
              : "text-[#a1a1aa] hover:bg-white/5"
          }`}
        >
          Past
        </button>
      </div>

      {loading ? (
        <p className="text-xs text-[#a1a1aa]">Loading {activeTab} bookings…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-xs text-[#a1a1aa]">
          No {activeTab} bookings yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((booking) => (
            <div
              key={booking.id || booking._id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs md:flex-row md:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {booking.name || booking.guestName || "Guest"}
                </p>
                <p className="mt-0.5 text-[#a1a1aa]">
                  {booking.email || booking.guestEmail || "No email"}
                </p>
                <p className="mt-1 text-[11px] text-[#6e6e73]">
                  {booking.eventTitle || booking.eventName || "Event"} ·{" "}
                  {booking.date} · {booking.time}
                </p>
              </div>
              {activeTab === "upcoming" && (
                <div className="flex gap-2 md:justify-end">
                  <button
                    onClick={() => handleCancel(booking)}
                    className="rounded-full border border-red-500/40 px-4 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;

