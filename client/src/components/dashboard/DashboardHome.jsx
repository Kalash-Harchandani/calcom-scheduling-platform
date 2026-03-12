import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar as CalendarIcon, Link as LinkIcon, Clock, Users, ArrowRight } from "lucide-react";
import dayjs from "dayjs";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingBookingsCount: 0,
    upcomingBookingsList: [],
    availabilityStatus: "Loading...",
  });
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [eventsRes, upcomingRes, availabilityRes] = await Promise.all([
          axios.get("/api/events"),
          axios.get("/api/bookings/upcoming"),
          axios.get("/api/availability"),
        ]);

        const eventsData = eventsRes.data?.data ?? eventsRes.data;
        const upcomingData = upcomingRes.data?.data ?? upcomingRes.data;
        const availabilityData = availabilityRes.data?.data ?? availabilityRes.data;

        const totalEvents = Array.isArray(eventsData) ? eventsData.length : 0;
        const upcomingBookingsList = Array.isArray(upcomingData) ? upcomingData : [];
        const upcomingBookingsCount = upcomingBookingsList.length;

        let availabilityStatus = "Not configured";
        if (Array.isArray(availabilityData) && availabilityData.length > 0) {
          availabilityStatus = "Active";
        } else if (availabilityData && availabilityData.id) {
          availabilityStatus = "Active";
        }

        setStats({ totalEvents, upcomingBookingsCount, upcomingBookingsList, availabilityStatus });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          availabilityStatus: "Unable to load",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/Admin");
    setToastMessage("Profile link copied to clipboard!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="space-y-8 text-white pb-10">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-black shadow-lg">
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Admin</h1>
            <p className="mt-1 text-sm text-[#a1a1aa]">Your scheduling dashboard is looking good today.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={copyLink}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
          >
            <LinkIcon className="h-4 w-4" />
            Copy Profile Link
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a1a1aa]">Event Types</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <LinkIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {loading ? "..." : stats.totalEvents}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a1a1aa]">Upcoming Bookings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {loading ? "..." : stats.upcomingBookingsCount}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a1a1aa]">Availability Schedule</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <p className="text-sm font-medium text-white">
              {loading ? "..." : stats.availabilityStatus}
            </p>
            {!loading && stats.availabilityStatus === "Active" && (
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Bookings Preview List */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#a1a1aa]" />
            Your Next Meetings
          </h3>
          <Link to="/app/bookings" className="text-xs text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="p-0">
          {loading ? (
            <div className="px-6 py-8 text-center text-xs text-[#a1a1aa]">Loading bookings...</div>
          ) : stats.upcomingBookingsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05]">
                <CalendarIcon className="h-5 w-5 text-[#6e6e73]" />
              </div>
              <p className="text-sm font-medium text-white mb-1">No upcoming meetings</p>
              <p className="text-xs text-[#a1a1aa] max-w-sm">Share your profile link to start getting booked.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {stats.upcomingBookingsList.slice(0, 4).map((booking) => {
                const dateObj = booking.booking_date ? dayjs(booking.booking_date) : dayjs(booking.date);
                const isToday = dateObj.isSame(dayjs(), 'day');
                
                return (
                  <div key={booking.id || booking._id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-white/[0.03] border border-white/10 border-b-white/20">
                        <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">{dateObj.format('MMM')}</span>
                        <span className="text-sm font-bold text-white leading-tight">{dateObj.format('DD')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {booking.eventTitle || "Meeting"} with Admin and {booking.name || booking.guestName || "Guest"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {isToday && <span className="rounded-sm bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Today</span>}
                          <p className="text-xs text-[#a1a1aa]">
                            {booking.start_time ? booking.start_time.slice(0,5) : (booking.time || "TBD")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;

