import React from "react";

const footerColumns = [
  {
    heading: "Solutions",
    links: [
      "iOS/Android App",
      "Self‑hosted",
      "Pricing",
      "Docs",
      "Cal.ai - AI Phone Agent",
      "Enterprise",
      "Integrate Cal.com",
      "Routing",
      "Cal.com Atoms",
      "Desktop App",
      "FAQ",
      "Enterprise API",
      "Github",
      "Docker",
    ],
  },
  {
    heading: "Use Cases",
    links: [
      "Sales",
      "Marketing",
      "Talent Acquisition",
      "Customer Support",
      "Higher Education",
      "Telehealth",
      "Professional Services",
      "Hiring Marketplace",
      "Human Resources",
      "Tutoring",
      "C‑suite",
      "Law",
    ],
  },
  {
    heading: "Resources",
    links: [
      "Affiliate Program",
      "Help Docs",
      "Blog",
      "Teams",
      "Embed",
      "Recurring events",
      "Developers",
      "OOO",
      "Workflows",
      "Instant Meetings",
      "App Store",
      "Requires confirmation",
      "Payments",
      "Video Conferencing",
      "Cal.com vs Calendly",
    ],
  },
  {
    heading: "Company",
    links: [
      "Jobs",
      "About",
      "Open Startup",
      "Support",
      "Privacy",
      "Terms",
      "License",
      "Security",
      "Changelog",
      "Get a demo",
      "Talk to sales",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f7] pt-12 text-[#111111] md:pt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 border-b border-black/5 pb-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2.6fr)] md:gap-12 md:pb-12">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                Cal
              </div>
              <span className="text-base font-semibold tracking-tight">
                Cal.com
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#3c3c43] md:text-sm">
              Our mission is to connect a billion people by 2031 through
              calendar scheduling.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] text-[#3c3c43] ring-1 ring-black/5">
              All Systems Operational
            </div>

            <div className="mt-6 space-y-2 text-xs text-[#6e6e73]">
              <p>Downloads</p>
              <div className="flex flex-wrap gap-2">
                {["iPhone", "Android", "Chrome", "Safari", "Edge", "Firefox", "MacOS", "Windows", "Linux"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-medium text-[#3c3c43] ring-1 ring-black/5"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
                  {column.heading}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[#3c3c43]">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button className="text-left text-xs text-[#3c3c43] transition-colors hover:text-[#111111]">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 py-6 text-[11px] text-[#6e6e73] md:flex-row md:items-center">
          <p>Cal.com® and Cal® are registered trademarks by Cal.com, Inc.</p>
          <p>
            Need help?{" "}
            <span className="underline decoration-dotted underline-offset-2">
              support@cal.com
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
