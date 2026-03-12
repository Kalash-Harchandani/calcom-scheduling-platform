import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingBookings: 0,
    availabilityStatus: "Loading...",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, upcomingRes, availabilityRes] = await Promise.all([
          axios.get("/api/events"),
          axios.get("/api/bookings/upcoming"),
          axios.get("/api/availability"),
        ]);

        const eventsData =
          eventsRes.data && typeof eventsRes.data === "object"
            ? eventsRes.data.data ?? eventsRes.data
            : eventsRes.data;

        const upcomingData =
          upcomingRes.data && typeof upcomingRes.data === "object"
            ? upcomingRes.data.data ?? upcomingRes.data
            : upcomingRes.data;

        const totalEvents = Array.isArray(eventsData) ? eventsData.length : 0;
        const upcomingBookings = Array.isArray(upcomingData)
          ? upcomingData.length
          : 0;

        let availabilityStatus = "Not configured";
        const availabilityData =
          availabilityRes.data && typeof availabilityRes.data === "object"
            ? availabilityRes.data.data ?? availabilityRes.data
            : availabilityRes.data;
        if (Array.isArray(availabilityData) && availabilityData.length > 0) {
          availabilityStatus = "Active";
        } else if (availabilityData && availabilityData.id) {
          availabilityStatus = "Active";
        }

        setStats({ totalEvents, upcomingBookings, availabilityStatus });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          availabilityStatus: "Unable to load",
        }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-[#a1a1aa]">Total event types</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {stats.totalEvents}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-[#a1a1aa]">Upcoming bookings</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {stats.upcomingBookings}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-xs text-[#a1a1aa]">Availability</p>
          <p className="mt-2 text-sm font-medium text-white">
            {stats.availabilityStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

