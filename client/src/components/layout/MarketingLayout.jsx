import React, { useEffect } from "react";
import Navbar from "../marketing/Navbar";
import Hero from "../marketing/Hero";
import TrustedBy from "../marketing/TrustedBy";
import Features from "../marketing/Features";
import Testimonials from "../marketing/Testimonials";
import Footer from "../marketing/Footer";

const MarketingLayout = () => {
  useEffect(() => {
    document.title = "Cal.com | Open Scheduling Infrastructure";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#111111]">
      <Navbar />

      <main className="pt-20 md:pt-24">
        <Hero />
        <TrustedBy />
        <Features />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default MarketingLayout;
