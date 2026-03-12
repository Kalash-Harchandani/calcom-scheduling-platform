import React, { useEffect, useState } from "react";

const DURATIONS = ["15m", "30m", "45m", "1h"];
const REVIEW_SOURCES = ["Trustpilot", "Google Reviews"];
const HIGHLIGHTED_DATES = [15, 16, 20, 21, 22, 23, 27, 28, 29, 30];

const Hero = () => {
  const [durationIndex, setDurationIndex] = useState(0);
  const [dateIndex, setDateIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const durationTimer = setInterval(() => {
      setDurationIndex((prev) => (prev + 1) % DURATIONS.length);
    }, 3740);

    const dateTimer = setInterval(() => {
      setDateIndex((prev) => (prev + 1) % HIGHLIGHTED_DATES.length);
    }, 3060);

    const reviewTimer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEW_SOURCES.length);
    }, 4420);

    return () => {
      clearInterval(durationTimer);
      clearInterval(dateTimer);
      clearInterval(reviewTimer);
    };
  }, []);

  const selectedDuration = DURATIONS[durationIndex];
  const selectedDate = HIGHLIGHTED_DATES[dateIndex];
  const activeReview = REVIEW_SOURCES[reviewIndex];

  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-[#f5f5f7]">
      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-4 md:px-12 lg:px-20 md:pb-32 md:pt-8">
        
        {/* Infinite Background Grid Lines */}
        <div className="absolute left-4 right-4 top-4 bottom-28 md:left-12 md:right-12 lg:left-20 lg:right-20 md:top-8 md:bottom-32 pointer-events-none">
          {/* Horizontal lines */}
          <div className="absolute top-0 -left-[100vw] w-[200vw] h-[1px] bg-black/[0.04]" />
          <div className="absolute bottom-0 -left-[100vw] w-[200vw] h-[1px] bg-black/[0.04]" />
          
          {/* Vertical lines */}
          <div className="absolute left-0 -top-[100vh] h-[200vh] w-[1px] bg-black/[0.04]" />
          <div className="absolute right-0 -top-[100vh] h-[200vh] w-[1px] bg-black/[0.04]" />

          {/* Crosshairs */}
          <svg className="absolute -top-1.5 -left-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -top-1.5 -right-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -bottom-1.5 -left-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <svg className="absolute -bottom-1.5 -right-1.5 w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl rounded-[12px] border border-black/5 bg-white p-12 shadow-[0_18px_60px_rgba(0,0,0,0.08)] md:p-14 lg:p-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
            {/* Left content */}
            <div className="flex-1 max-w-xl">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-[#3c3c43] shadow-sm ring-1 ring-black/5">
                Cal.com launches v6.2
              </span>
              <h1
                className="mt-4 font-display text-[40px] font-normal leading-[1.1] tracking-tight text-[#141414] md:text-[52px] lg:text-[64px]"
                style={{
                  "--framer-font-family": '"Cal Sans", sans-serif',
                  "--framer-font-open-type-features": "normal",
                  "--framer-font-size": "64px",
                  "--framer-font-style": "normal",
                  "--framer-font-variation-axes": "normal",
                  "--framer-font-weight": 400,
                  "--framer-letter-spacing": "0em",
                  "--framer-line-height": "1.1em",
                  "--framer-paragraph-spacing": "0px",
                  "--framer-text-alignment": "center",
                  "--framer-text-color":
                    "var(--token-fe0d69fb-0445-4f97-b1b4-d5035d890a7a, #141414)",
                  "--framer-text-decoration": "none",
                  "--framer-text-stroke-color": "initial",
                  "--framer-text-stroke-width": "initial",
                  "--framer-text-transform": "none",
                }}
              >
                The better way to schedule your meetings
              </h1>
              <p
                className="mt-4 max-w-lg text-sm leading-relaxed text-[#3c3c43] md:text-base"
                style={{
                  "--framer-font-family":
                    '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                  "--framer-font-family-bold":
                    '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                  "--framer-font-open-type-features": "normal",
                  "--framer-font-size": "18px",
                  "--framer-font-style": "normal",
                }}
              >
                A fully customizable scheduling software for individuals,
                businesses taking calls and developers building scheduling
                platforms where users meet users.
              </p>

              <div className="mt-6">
                <p className="rounded-full bg-[#f5f5f7] px-4 py-2 inline-block text-sm font-medium text-[#111111] ring-1 ring-black/10">
                  No login required, admin demo usage.
                </p>
              </div>
            </div>

            {/* Right animated booking preview */}
            <div className="flex-1">
              <div className="relative rounded-[10px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/5 md:p-5 lg:p-6">
                {/* Window chrome */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[10px] font-medium text-[#3c3c43]">
                    cal.com / booking
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] md:gap-6">
                  {/* Host / meeting info */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold text-white">
                          CvR
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6e6e73]">
                            Cédric van Ravesteijn
                          </p>
                          <p className="text-sm font-semibold text-[#111111]">
                            Partnerships Meeting
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">
                        Are you an agency, influencer, SaaS founder, or
                        business looking to collaborate with Cal.com? Let&apos;s
                        chat!
                      </p>
                    </div>

                    {/* Animated duration pills */}
                    <div className="flex flex-wrap gap-2 text-[11px] font-medium">
                      {DURATIONS.map((duration, index) => {
                        const isActive = index === durationIndex;
                        return (
                          <div
                            key={duration}
                            className={`rounded-full px-3 py-1 transition-all duration-300 ${
                              isActive
                                ? "bg-[#111111] text-white shadow-sm"
                                : "bg-[#f5f5f7] text-[#3c3c43]"
                            }`}
                          >
                            {duration}
                          </div>
                        );
                      })}
                    </div>

                    {/* Static meta info with animated summary line */}
                    <div className="space-y-2 text-xs text-[#3c3c43]">
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border border-black/20" />
                        <span>Asia/Kolkata · IST</span>
                      </div>
                      <p className="mt-2 text-[11px] text-[#6e6e73] transition-colors duration-300">
                        Auto‑picking the best slot on{" "}
                        <span className="font-medium text-[#111111]">
                          May {selectedDate}, 2025
                        </span>{" "}
                        for a{" "}
                        <span className="font-medium text-[#111111]">
                          {selectedDuration} call
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="flex flex-col gap-3 border-t border-black/5 pt-4 text-xs text-[#3c3c43] md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-[#6e6e73]">
                          May 2025
                        </p>
                        <p className="text-[10px] text-[#a1a1aa]">
                          Asia/Kolkata
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f5f5f7]">
                          ‹
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f5f5f7]">
                          ›
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-[10px] text-[#a1a1aa]">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (day) => (
                          <div key={day} className="text-center">
                            {day}
                          </div>
                        ),
                      )}
                    </div>

                    {/* Days grid with animated selected date */}
                    <div className="grid grid-cols-7 gap-1 text-[11px]">
                      {/* offset so the 1st starts on Thursday like screenshot (3 blanks) */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {days.map((day) => {
                        const isHighlighted = HIGHLIGHTED_DATES.includes(day);
                        const isSelected = day === selectedDate;
                        return (
                          <div
                            key={day}
                            className={`flex h-7 items-center justify-center rounded-md border text-center transition-all duration-300 ${
                              isSelected
                                ? "border-transparent bg-[#111111] text-white shadow-sm scale-[1.08]"
                                : isHighlighted
                                  ? "border-transparent bg-[#e4e4e7] text-[#111111]"
                                  : "border-transparent text-[#6e6e73]"
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Static reviews row (outside calendar box) */}
              <div className="mt-8 flex items-center justify-between px-2">
                {/* Trustpilot */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={`tp-${i}`} className="flex h-[22px] w-[22px] items-center justify-center bg-[#00b67a] text-[14px] text-white">
                        ★
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#111111]">
                    Trustpilot
                  </div>
                </div>

                {/* Product Hunt */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 text-[#da552f] text-[20px] leading-none">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#da552f]">
                    <span className="flex h-5 w-5 rounded-full items-center justify-center bg-[#da552f] text-[12px] text-white">P</span>
                  </div>
                </div>

                {/* G2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 text-[#ff492c] text-[20px] leading-none">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="opacity-40">★</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#ff492c]">
                    <span className="flex h-5 w-5 rounded-full items-center justify-center bg-[#ff492c] text-[12px] font-serif italic text-white pr-[1px]">G</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

