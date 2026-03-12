import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

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
    } finally {
      setOpenDropdownId(null);
    }
  };

  const items = activeTab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-6 text-white pb-10">
      <div className="flex items-center gap-4">
        <div className="flex gap-4 border-b border-white/10 w-full pb-3 text-sm font-medium">
          <button
            onClick={() => handleTabChange("upcoming")}
            className={`${
              activeTab === "upcoming"
                ? "text-white"
                : "text-[#a1a1aa] hover:text-white"
            } transition-colors`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleTabChange("past")}
            className={`${
              activeTab === "past"
                ? "text-white"
                : "text-[#a1a1aa] hover:text-white"
            } transition-colors`}
          >
            Past
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-[#a1a1aa] mt-8">Loading {activeTab} bookings…</p>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-xs text-[#a1a1aa]">
          No {activeTab} bookings yet.
        </div>
      ) : (
        <div className="mt-8">
          <h3 className="text-xs font-bold tracking-widest text-[#a1a1aa] uppercase mb-4 px-2">Next</h3>
          <div className="flex flex-col gap-0 rounded-xl border border-white/10 bg-[#111111]">
            {items.map((booking) => {
              // Parse date and time to format them beautifully
              const dateObj = booking.booking_date ? dayjs(booking.booking_date) : (booking.date ? dayjs(booking.date) : dayjs());
              const formattedDate = dateObj.format("ddd, D MMM");
              
              const guestName = booking.name || booking.guestName || "Guest";
              const title = booking.eventTitle || booking.eventName || "Quick Chat";
              const duration = parseInt(booking.duration || 30, 10);
              const startTime = booking.start_time || booking.time || "10:00am";
              
              // Calculate end time roughly if possible
              let endTimeOutput = "";
              try {
                // If it's a known format like "10:00 AM", we can parse and add duration
                const dateStr = booking.booking_date || booking.date || dayjs().format('YYYY-MM-DD');
                const parsedStart = dayjs(`${dateStr} ${startTime}`);
                if (parsedStart.isValid()) {
                  endTimeOutput = " - " + parsedStart.add(duration, 'minute').format("h:mma").toLowerCase();
                }
              } catch (e) {
                // ignore
              }

              return (
                <article
                  key={booking.id || booking._id}
                  className="flex items-start justify-between border-b border-white/10 last:border-0 p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 w-full">
                    {/* Left: Date & Time */}
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-white">{formattedDate}</span>
                      <span className="text-[#a1a1aa] mt-0.5">{startTime.toLowerCase()}{endTimeOutput}</span>
                    </div>

                    {/* Middle: Event Info */}
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-white">{title} with Admin and {guestName}</span>
                      <span className="text-[#a1a1aa] mt-0.5">You and {guestName.toLowerCase()}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="relative ml-4 flex-shrink-0">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === (booking.id || booking._id) ? null : (booking.id || booking._id))}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-[#a1a1aa] hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {openDropdownId === (booking.id || booking._id) && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenDropdownId(null)} 
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 w-32 overflow-hidden rounded-lg border border-white/10 bg-[#111111] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                          {activeTab === "upcoming" && (
                            <button
                              onClick={() => handleCancel(booking)}
                              className="block w-full px-4 py-2 text-left text-xs font-medium text-red-400 hover:bg-red-500/10"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          
          <div className="flex items-center justify-between mt-6 px-2 text-xs text-[#a1a1aa]">
             <div className="flex items-center gap-2">
               <select className="bg-transparent border border-white/10 rounded-md px-2 py-1 outline-none focus:border-white/20">
                 <option value="10">10</option>
                 <option value="20">20</option>
                 <option value="50">50</option>
               </select>
               <span>rows per page</span>
             </div>
             <div className="flex items-center gap-4">
               <span>1-{items.length} of {items.length}</span>
               <div className="flex gap-1">
                 <button disabled className="p-1 rounded opacity-50 cursor-not-allowed hidden md:block">‹</button>
                 <button disabled className="p-1 rounded opacity-50 cursor-not-allowed hidden md:block">›</button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;

