import React from "react";
import { 
  CreditCard, 
  Video, 
  Link, 
  ShieldCheck, 
  Languages, 
  AppWindow, 
  Blocks, 
  SquareDashedBottomCode 
} from "lucide-react";

const features = [
  {
    title: "Accept payments",
    description: "Charge for bookings, send invoices, and get paid automatically.",
    icon: <CreditCard className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "Built-in video\nconferencing",
    description: "Spin up video rooms with your favorite providers in one click.",
    icon: <Video className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "Short booking links",
    description: "Share clean, branded links that look great everywhere.",
    icon: <Link className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "Privacy first",
    description: "Data residency, audit logs, and granular access controls.",
    icon: <ShieldCheck className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "65+ languages",
    description: "Automatically localize scheduling flows for global teams.",
    icon: <Languages className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "Easy embeds",
    description: "Drop scheduling into your app or website in minutes.",
    icon: <AppWindow className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "All your favorite apps",
    description: "Sync with CRMs, help desks, payments, and more.",
    icon: <Blocks className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
  {
    title: "Simple customization",
    description: "Match your brand with themes, layouts, and custom fields.",
    icon: <SquareDashedBottomCode className="w-5 h-5 text-black" strokeWidth={2.5} />,
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] pb-32 pt-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-12 lg:px-20">

        {/* Infinite Background Grid Lines */}
        <div className="absolute left-4 right-4 top-[-2rem] bottom-[-2rem] md:left-12 md:right-12 lg:left-20 lg:right-20 md:top-[-4rem] md:bottom-[-4rem] pointer-events-none">
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

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="text-center mb-16 mt-8">
            <h2 className="font-display text-[26px] font-bold tracking-tight text-[#111111] md:text-[32px]">
              ...and so much more!
            </h2>
          </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 justify-center">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex aspect-square flex-col items-center justify-center rounded-[20px] bg-white p-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow cursor-default"
            >
              {/* Default state: Icon & Title */}
              <div className="flex flex-col items-center absolute inset-0 justify-center p-4 transition-opacity duration-300 group-hover:opacity-0">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                  {feature.icon}
                </div>
                <h3 
                  className="leading-tight whitespace-pre-line"
                  style={{
                    "--framer-font-family": '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                    "--framer-font-family-bold": '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                    "--framer-font-open-type-features": "normal",
                    "--framer-font-size": "14px",
                    "--framer-font-style": "normal",
                    "--framer-font-style-bold": "normal",
                    "--framer-font-variation-axes": "normal",
                    "--framer-font-weight": 300,
                    "--framer-font-weight-bold": 300,
                    "--framer-letter-spacing": "0em",
                    "--framer-line-height": "1.4em",
                    "--framer-paragraph-spacing": "12px",
                    "--framer-text-alignment": "center",
                    "--framer-text-color": "var(--token-73a9b904-5ed0-4590-a8cc-d5ddf2346358, #898989)",
                    "--framer-text-decoration": "none",
                    "--framer-text-stroke-color": "initial",
                    "--framer-text-stroke-width": "initial",
                    "--framer-text-transform": "none",
                    color: "var(--token-73a9b904-5ed0-4590-a8cc-d5ddf2346358, #898989)",
                    fontSize: "14px",
                    fontWeight: 300,
                    lineHeight: "1.4em",
                    textAlign: "center"
                  }}
                >
                  {feature.title}
                </h3>
              </div>

              {/* Hover state: Description */}
              <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white rounded-[20px]">
                <p className="text-[12px] leading-relaxed text-[#6e6e73]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
