import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Link as LinkIcon, Clock, Calendar, ArrowLeft } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Event Types", to: "/app/events", icon: LinkIcon },
  { label: "Availability", to: "/app/availability", icon: Clock },
  { label: "Bookings", to: "/app/bookings", icon: Calendar },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r border-white/10 bg-[#111111] px-4 py-5 md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-7 w-7 items-center justify-center rounded shadow-sm ring-1 ring-white/20 bg-black text-xs font-bold text-white">
            A
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">Admin</span>
        </div>

        <nav className="space-y-1 text-sm text-[#a1a1aa]">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                  active ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-[#a1a1aa] transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex min-h-screen flex-1 flex-col bg-black">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-medium text-white">
                {navItems.find((n) => location.pathname.startsWith(n.to))?.label ??
                  "Dashboard"}
              </h1>
            </div>
            <div>
              {/* Profile removed from top right */}
            </div>
          </div>
        </header>

        <div className="flex-1 bg-black px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

