import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./components/layout/MarketingLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import EventTypes from "./components/dashboard/EventTypes";
import Availability from "./components/dashboard/Availability";
import Bookings from "./components/dashboard/Bookings";
import BookEvent from "./components/booking/BookEvent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketingLayout />} />
      <Route path="/book/:slug" element={<BookEvent />} />

      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="events" element={<EventTypes />} />
        <Route path="availability" element={<Availability />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

