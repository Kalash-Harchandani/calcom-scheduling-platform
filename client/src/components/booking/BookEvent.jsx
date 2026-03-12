import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const BookEvent = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingState, setBookingState] = useState({
    name: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedDetails, setBookedDetails] = useState(null);
  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoadingEvent(true);
        const res = await axios.get(`/api/events/slug/${slug}`);
        const payload =
          res.data && typeof res.data === "object"
            ? res.data.data ?? res.data
            : res.data;
        setEvent(payload);
      } catch {
        setEvent(null);
      } finally {
        setLoadingEvent(false);
      }
    };

    loadEvent();
  }, [slug]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!slug) return;
      setLoadingSlots(true);
      try {
        const res = await axios.get("/api/slots", {
          params: {
            slug,
            date: date.format("YYYY-MM-DD"),
          },
        });
        const data = res.data;
        setSlots(data.slots || []);
      } catch {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [slug, date]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setBookingState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!event || !selectedSlot) return;
    setSubmitting(true);
    setSuccessMessage("");
    try {
      await axios.post("/api/bookings", {
        event_type_id: event.id,
        name: bookingState.name,
        email: bookingState.email,
        booking_date: date.format("YYYY-MM-DD"),
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
      });
      setBookedDetails({
        eventName: event.title,
        date: date,
        startTime: selectedSlot.start_time,
        endTime: selectedSlot.end_time,
        name: bookingState.name,
        email: bookingState.email,
      });
      setSuccessMessage("Your meeting has been booked!");
      setSelectedSlot(null);
      setBookingState({ name: "", email: "" });
    } catch {
      setSuccessMessage("Unable to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedDate = date.format("MMMM D, YYYY");

  const monthLabel = date.format("MMMM YYYY");
  const startOfMonth = date.startOf("month");
  const daysInMonth = date.daysInMonth();
  const startWeekday = startOfMonth.day(); // 0 = Sunday
  const today = dayjs().startOf("day");

  if (loadingEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509] text-white">
        <p className="text-sm text-[#a1a1aa]">Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050509] text-white">
        <p className="text-sm text-[#a1a1aa]">Event not found.</p>
      </div>
    );
  }

  if (successMessage && bookedDetails) {
    const startHourMin = bookedDetails.startTime.slice(0, 5);
    const endHourMin = bookedDetails.endTime.slice(0, 5);
    const dateFormatted = bookedDetails.date.format("dddd, MMMM D, YYYY");

    return (
      <div className="min-h-screen bg-[#050509] px-4 py-10 text-white md:px-0 flex items-center justify-center">
        <div className="mx-auto w-full max-w-2xl min-h-[500px] rounded-[28px] border border-white/10 bg-[#050509] px-8 py-16 shadow-[0_32px_110px_rgba(0,0,0,1)] text-[#e4e4e7]">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#1b2b24] text-[#4ade80]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-3 text-2xl font-semibold text-white">This meeting is scheduled</h1>
            <p className="mb-12 text-[15px] text-[#a1a1aa] max-w-sm mx-auto">
              We sent an email with a calendar invitation with the details to everyone.
            </p>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-10 max-w-lg mx-auto">
            <div className="grid grid-cols-[120px_1fr] gap-4 text-[14px]">
              <div className="font-medium text-[#a1a1aa]">What</div>
              <div className="text-white">{bookedDetails.eventName} between Admin and {bookedDetails.name}</div>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-4 text-[14px]">
              <div className="font-medium text-[#a1a1aa]">When</div>
              <div className="text-white">
                {dateFormatted}<br />
                {startHourMin} - {endHourMin} (India Standard Time)
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-4 text-[14px]">
              <div className="font-medium text-[#a1a1aa]">Who</div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white">Admin</span>
                    <span className="rounded bg-[#25283c] px-1.5 py-[2px] text-[10px] font-semibold text-[#818cf8]">Host</span>
                  </div>
                </div>
                <div>
                  <div className="text-white mb-0.5">{bookedDetails.name}</div>
                  <div className="text-[#a1a1aa]">{bookedDetails.email}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] px-4 py-10 text-white md:px-0 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl min-h-[540px] rounded-[28px] border border-white/10 bg-[#050509] px-10 py-16 shadow-[0_32px_110px_rgba(0,0,0,1)] md:px-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[280px_minmax(0,1.1fr)_minmax(0,1.1fr)]">
          {/* Left: event summary */}
          <aside className="space-y-5 border-b border-white/10 pb-8 text-sm text-[#e4e4e7] md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                {event.title.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-[#a1a1aa]">Admin</p>
                <p className="text-xs text-[#6e6e73]">{formattedDate}</p>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-white md:text-2xl">
                {event.title}
              </h1>
              <p className="text-sm text-[#a1a1aa]">
                {event.duration} min · Meeting
              </p>
            </div>
            {event.description && (
              <p className="mt-4 text-sm text-[#e4e4e7] leading-relaxed">
                {event.description}
              </p>
            )}
            <div className="mt-6 space-y-1 text-xs text-[#a1a1aa]">
              <p>Asia/Kolkata</p>
            </div>
          </aside>

          {/* Middle: calendar */}
          <div className="space-y-5 text-sm text-[#e4e4e7]">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
                onClick={() => {
                  const prev = date.subtract(1, "month");
                  // Don't allow navigating to months that are entirely in the past
                  if (prev.endOf("month").isBefore(today)) return;
                  setDate(prev);
                }}
                disabled={
                  date.startOf("month").isBefore(today.startOf("month")) ||
                  date.startOf("month").isSame(today.startOf("month"))
                }
              >
                ‹
              </button>
              <p className="text-xs font-medium text-[#a1a1aa]">
                {monthLabel}
              </p>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs hover:bg-white/10"
                onClick={() => setDate(date.add(1, "month"))}
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-[11px] text-[#6e6e73]">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <div key={d} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-[12px]">
              {Array.from({ length: startWeekday }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNumber = idx + 1;
                const cellDate = date.date(dayNumber);
                const isPast = cellDate.isBefore(today, "day");
                const isSelected = cellDate.isSame(date, "day");
                return (
                  <button
                    key={dayNumber}
                    type="button"
                    onClick={() => {
                      if (isPast) return;
                      setDate(cellDate);
                    }}
                    disabled={isPast}
                    className={`flex h-9 items-center justify-center rounded-md border text-center text-[12px] transition ${
                      isSelected
                        ? "border-transparent bg-white text-black shadow-sm"
                        : isPast
                          ? "border-transparent text-[#27272f] cursor-not-allowed"
                          : "border-transparent text-[#a1a1aa] hover:bg-white/5"
                    }`}
                  >
                    {dayNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: times + booking form */}
          <div className="space-y-5 text-sm text-[#e4e4e7]">
            <div>
              <p className="mb-2 text-xs font-medium text-[#a1a1aa]">
                Available times
              </p>
              {loadingSlots ? (
                <p className="text-xs text-[#6e6e73]">Loading slots…</p>
              ) : slots.length === 0 ? (
                <p className="text-xs text-[#6e6e73]">
                  No available slots for this date.
                </p>
              ) : (
                <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
                  {slots.map((slot) => {
                    const label = slot.start_time.slice(0, 5);
                    const isSelected =
                      selectedSlot &&
                      selectedSlot.start_time === slot.start_time &&
                      selectedSlot.end_time === slot.end_time;
                    return (
                      <button
                        key={`${slot.start_time}-${slot.end_time}`}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex items-center justify-between rounded-full px-4 py-2 text-xs font-medium transition ${
                          isSelected
                            ? "bg-white text-black"
                            : "bg-white/5 text-[#e4e4e7] hover:bg-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <form onSubmit={handleBook} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-[#a1a1aa]">
                  Name
                </label>
                <input
                  name="name"
                  value={bookingState.name}
                  onChange={handleFieldChange}
                  required
                  className="w-full rounded-lg border border-white/15 bg-[#09090f] px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#a1a1aa]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingState.email}
                  onChange={handleFieldChange}
                  required
                  className="w-full rounded-lg border border-white/15 bg-[#09090f] px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedSlot || submitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-sm disabled:cursor-not-allowed disabled:bg-[#a1a1aa]"
              >
                {submitting
                  ? "Booking…"
                  : selectedSlot
                    ? `Confirm ${selectedSlot.start_time.slice(0, 5)} slot`
                    : "Choose a time to continue"}
              </button>

              {successMessage && (
                <p className="text-xs text-emerald-400">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;

