import React, { useEffect, useState } from "react";

const navLinks = [
  "Solutions",
  "Enterprise",
  "Cal.ai",
  "Developer",
  "Resources",
  "Pricing",
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-transparent" : "bg-[#f5f5f7]"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6 md:py-4 ${
          isScrolled
            ? "mt-2 rounded-full border border-black/5 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur"
            : "mt-0"
        }`}
      >
        <div className="flex items-center">
          <span className="text-2xl font-semibold tracking-tight text-[#111111]">
            Cal.com
          </span>
        </div>

        <div className="hidden items-center space-x-10 text-base text-[#6e6e73] md:flex">
          {navLinks.map((item) => (
            <button
              key={item}
              className="font-normal"
              style={{
                "--framer-font-family":
                  '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
                "--framer-font-family-bold":
                  '"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif',
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
                "--framer-text-alignment": "left",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="rounded-full bg-[#111111] px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-black">
            Go to app
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
