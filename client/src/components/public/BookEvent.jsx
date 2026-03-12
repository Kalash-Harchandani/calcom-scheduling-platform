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

  if (loadingEvent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] text-[#111111]">
        <p className="text-sm text-[#6e6e73]">Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] text-[#111111]">
        <p className="text-sm text-[#6e6e73]">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-10 text-[#111111] md:px-0">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-[24px] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] md:flex-row md:p-8">
        {/* Left: event info & booking form */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-medium text-[#6e6e73]">
              {event.duration} min · Meeting
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              {event.title}
            </h1>
            {event.description && (
              <p className="mt-2 text-sm text-[#3c3c43]">
                {event.description}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-[#6e6e73]">Selected date</p>
            <p className="text-sm font-semibold text-[#111111]">
              {formattedDate}
            </p>
          </div>

          <form onSubmit={handleBook} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-[#6e6e73]">
                Name
              </label>
              <input
                name="name"
                value={bookingState.name}
                onChange={handleFieldChange}
                required
                className="w-full rounded-lg border border-black/10 bg-[#f5f5f7] px-3 py-2 text-sm outline-none focus:border-black/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[#6e6e73]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={bookingState.email}
                onChange={handleFieldChange}
                required
                className="w-full rounded-lg border border-black/10 bg-[#f5f5f7] px-3 py-2 text-sm outline-none focus:border-black/40"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedSlot || submitting}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-[#3f3f46]"
            >
              {submitting
                ? "Booking…"
                : selectedSlot
                  ? `Confirm ${selectedSlot.start_time.slice(0, 5)} slot`
                  : "Choose a time to continue"}
            </button>

            {successMessage && (
              <p className="text-xs text-[#16a34a]">{successMessage}</p>
            )}
          </form>
        </div>

        {/* Right: date and slots */}
        <div className="flex-1 space-y-4 border-t border-black/5 pt-4 text-xs text-[#3c3c43] md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#6e6e73]">
                Choose a date
              </p>
              <input
                type="date"
                value={date.format("YYYY-MM-DD")}
                onChange={(e) => setDate(dayjs(e.target.value))}
                className="mt-1 rounded-lg border border-black/10 bg-[#f5f5f7] px-2 py-1 text-xs outline-none focus:border-black/40"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-medium text-[#6e6e73]">
              Available times
            </p>
            {loadingSlots ? (
              <p className="text-[11px] text-[#6e6e73]">Loading slots…</p>
            ) : slots.length === 0 ? (
              <p className="text-[11px] text-[#6e6e73]">
                No available slots for this date.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
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
                      className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                        isSelected
                          ? "bg-[#111111] text-white"
                          : "bg-[#f5f5f7] text-[#3c3c43] hover:bg-[#e4e4e7]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;

