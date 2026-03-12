import React from "react";

const features = [
  {
    title: "Accept payments",
    description: "Charge for bookings, send invoices, and get paid automatically.",
    icon: "💳",
  },
  {
    title: "Built‑in video conferencing",
    description: "Spin up video rooms with your favorite providers in one click.",
    icon: "🎥",
  },
  {
    title: "Short booking links",
    description: "Share clean, branded links that look great everywhere.",
    icon: "🔗",
  },
  {
    title: "Privacy first",
    description: "Data residency, audit logs, and granular access controls.",
    icon: "🛡️",
  },
  {
    title: "65+ languages",
    description: "Automatically localize scheduling flows for global teams.",
    icon: "🌐",
  },
  {
    title: "Easy embeds",
    description: "Drop scheduling into your app or website in minutes.",
    icon: "🧩",
  },
  {
    title: "All your favorite apps",
    description: "Sync with CRMs, help desks, payments, and more.",
    icon: "⭐",
  },
  {
    title: "Simple customization",
    description: "Match your brand with themes, layouts, and custom fields.",
    icon: "🎨",
  },
];

const Features = () => {
  return (
    <section className="border-b border-black/5 bg-[#f5f5f7]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-18 lg:py-20">
        <div className="text-center">
          <h2 className="font-display text-[22px] font-normal tracking-tight text-[#202124] md:text-[26px]">
            ...and so much more!
          </h2>
          <p className="mt-3 text-sm text-[#3c3c43] md:text-base">
            Everything you need to run scheduling at scale, from a single link
            to global infrastructure.
          </p>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-lg bg-white px-3 text-center shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon tile */}
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                <span className="text-base">{feature.icon}</span>
              </div>

              {/* Heading */}
              <h3 className="text-xs font-semibold text-[#111111]">
                {feature.title}
              </h3>

              {/* Description (appears on hover) */}
              <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-[#6e6e73] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
