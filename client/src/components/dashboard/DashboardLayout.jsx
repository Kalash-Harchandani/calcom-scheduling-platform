import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Event Types", to: "/app/events" },
  { label: "Availability", to: "/app/availability" },
  { label: "Bookings", to: "/app/bookings" },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#050509] text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 flex-shrink-0 border-r border-white/10 bg-[#050509] px-4 py-5 md:flex md:flex-col">
        <div className="mb-6 flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
            Cal
          </div>
          <span className="text-sm font-semibold tracking-tight">Cal Scheduler</span>
        </div>

        <nav className="space-y-1 text-sm text-[#a1a1aa]">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between rounded-md px-2 py-2 transition-colors ${
                  active ? "bg-white/10 text-white" : "hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex min-h-screen flex-1 flex-col bg-[#050509]">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#050509]/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-medium text-white">
                {navItems.find((n) => location.pathname.startsWith(n.to))?.label ??
                  "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
              <span className="h-6 w-6 rounded-full bg-white/10" />
              <span>kalash</span>
            </div>
          </div>
        </header>

        <div className="flex-1 bg-[#050509] px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

