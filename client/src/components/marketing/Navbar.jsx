import React from "react";

const navLinks = [
  "Solutions",
  "Enterprise",
  "Cal.ai",
  "Developer",
  "Resources",
  "Pricing",
];

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f5f5f7]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            Cal
          </div>
          <span className="text-base font-semibold tracking-tight text-[#111111]">
            Cal.com
          </span>
        </div>

        <div className="hidden items-center space-x-8 text-sm font-medium text-[#3c3c43] md:flex">
          {navLinks.map((item) => (
            <button
              key={item}
              className="transition-colors hover:text-[#111111]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button className="hidden rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-[#111111] hover:border-black/25 md:inline-flex">
            Sign up
          </button>
          <button className="rounded-full bg-[#111111] px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-black">
            Go to app
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
