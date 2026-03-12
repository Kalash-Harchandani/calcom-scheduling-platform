import React from "react";

const logos = [
  {
    name: "Cal.com",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="h-[18px] w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.408 14.488C1.035 14.488 0 13.4 0 12.058c0-1.346.982-2.443 2.408-2.443.758 0 1.282.233 1.691.765l-.66.55a1.343 1.343 0 0 0-1.03-.442c-.93 0-1.44.711-1.44 1.57 0 .86.559 1.557 1.44 1.557.413 0 .765-.147 1.043-.443l.651.573c-.391.51-.929.743-1.695.743zM6.948 10.913h.89v3.49h-.89v-.51c-.185.362-.493.604-1.083.604-.943 0-1.695-.82-1.695-1.826 0-1.007.752-1.825 1.695-1.825.585 0 .898.241 1.083.604zm.026 1.758c0-.546-.374-.998-.964-.998-.568 0-.938.457-.938.998 0 .528.37.998.938.998.586 0 .964-.456.964-.998zM8.467 9.503h.89v4.895h-.89zM9.752 13.937a.53.53 0 0 1 .542-.528c.313 0 .533.242.533.528a.527.527 0 0 1-.533.537.534.534 0 0 1-.542-.537zM14.23 13.839c-.33.403-.832.658-1.426.658a1.806 1.806 0 0 1-1.84-1.826c0-1.007.778-1.825 1.84-1.825.572 0 1.07.241 1.4.622l-.687.577c-.172-.215-.396-.376-.713-.376-.568 0-.938.456-.938.998 0 .541.37.997.938.997.343 0 .58-.179.757-.42zM14.305 12.671c0-1.007.78-1.825 1.84-1.825 1.061 0 1.84.818 1.84 1.825 0 1.007-.779 1.826-1.84 1.826-1.06-.005-1.84-.82-1.84-1.826zm2.778 0c0-.546-.37-.998-.938-.998-.568-.004-.937.452-.937.998 0 .542.37.998.937.998.568 0 .938-.456.938-.998zM24 12.269v2.13h-.89v-1.911c0-.604-.281-.864-.704-.864-.396 0-.678.197-.678.864v1.91h-.89v-1.91c0-.604-.285-.864-.704-.864-.396 0-.744.197-.744.864v1.91h-.89v-3.49h.89v.484c.185-.376.52-.564 1.035-.564.489 0 .898.241 1.123.649.224-.417.554-.65 1.153-.65.731.005 1.299.56 1.299 1.442z"/>
      </svg>
    ),
  },
  {
    name: "Udemy",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z"/>
      </svg>
    ),
  },
  {
    name: "Rho",
    svg: <span className="text-xl font-bold italic tracking-tighter">Rho</span>
  },
  {
    name: "Deel",
    svg: <span className="text-xl font-bold tracking-tight">deel.</span>
  },
  {
    name: "Framer",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    ),
  },
  {
    name: "Ramp",
    svg: <span className="text-xl font-extrabold tracking-tight">ramp<span className="text-[#a1a1aa]">-</span></span>
  },
  {
    name: "PlanetScale",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87a11.981 11.981 0 0 1-1.935-1.099L14.99 12H12l-8.485 8.485A11.962 11.962 0 0 1 0 12Zm12.004 12L24 12.004C23.998 18.628 18.628 23.998 12.004 24Z"/>
      </svg>
    ),
  },
];

const TrustedBy = () => {
  return (
    <section className="border-b border-black/5 bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-10 md:flex-row md:items-center md:gap-10 md:px-6 md:py-12">
        <div className="w-full md:w-1/3">
          <p className="text-left text-xs font-normal text-[#6e6e73] md:text-sm">
            Trusted by fast‑growing companies around the world
          </p>
        </div>
        <div className="w-full overflow-hidden md:w-2/3">
          <div className="trusted-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center whitespace-nowrap text-[#111111] opacity-90 transition-opacity hover:opacity-100 px-6 px-10"
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

