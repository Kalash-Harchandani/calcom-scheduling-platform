// availabilityRanges: [{ start_time: "HH:MM:SS", end_time: "HH:MM:SS" }, ...]
// durationMinutes: number
// bookings: [{ start_time: "HH:MM:SS", end_time: "HH:MM:SS", status: "scheduled" | "cancelled", ... }]
// Returns: [{ start_time: "HH:MM:SS", end_time: "HH:MM:SS" }, ...]

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}:00`;
}

export function generateSlots(availabilityRanges, durationMinutes, bookings) {
  if (!durationMinutes || durationMinutes <= 0) {
    return [];
  }

  const bookedIntervals = (bookings || [])
    .filter((b) => b.status === "scheduled")
    .map((b) => ({
      start: timeToMinutes(b.start_time),
      end: timeToMinutes(b.end_time),
    }));

  const slots = [];

  for (const range of availabilityRanges || []) {
    const rangeStart = timeToMinutes(range.start_time);
    const rangeEnd = timeToMinutes(range.end_time);

    for (
      let start = rangeStart;
      start + durationMinutes <= rangeEnd;
      start += durationMinutes
    ) {
      const end = start + durationMinutes;

      const overlapsBooking = bookedIntervals.some(
        (b) => start < b.end && end > b.start
      );

      if (!overlapsBooking) {
        slots.push({
          start_time: minutesToTime(start),
          end_time: minutesToTime(end),
        });
      }
    }
  }

  return slots;
}
