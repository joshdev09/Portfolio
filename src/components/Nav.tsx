import { useState } from "react";

const navLinks = ["About", "Experience", "Projects", "Stacks", "Certifications"];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-center fixed top-0 w-full z-50 px-4">

      {/* ── Pill bar ─────────────────────────────────────────── */}
      <nav className="
        bg-[#333333]/40 backdrop-blur-md border border-white/10 shadow-lg
        mt-4 px-5 py-3 rounded-full w-full max-w-[45rem]
        flex items-center justify-between gap-4
      ">
        {/* Logo */}
        <h1 className="text-white font-semibold text-sm shrink-0 roboto-uniquifier">
          JHalili
        </h1>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 text-white inter-uniquifier text-sm items-center">
          {navLinks.map((link) => (
            <li
              key={link}
              className="cursor-pointer text-white/70 hover:text-white transition-colors duration-200"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Right side: CV icon + hamburger */}
        <div className="flex items-center gap-1 shrink-0">
          {/* CV / theme button */}
          <button className="rounded-full hover:bg-white/10 p-1.5 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-[#f0f2f5]"
            >
              <path
                fillRule="evenodd"
                d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                clipRule="evenodd"
              />
              <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
            </svg>
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden rounded-full hover:bg-white/10 p-1.5 cursor-pointer transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-[#f0f2f5]"
            >
              {menuOpen ? (
                /* X icon */
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              ) : (
                /* Hamburger icon */
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75Zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      <div
        className={`
          md:hidden w-full max-w-[45rem] overflow-hidden
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <ul className="
          bg-[#333333]/40 backdrop-blur-md border border-white/10 shadow-lg
          rounded-2xl px-5 py-4 flex flex-col gap-4
          text-sm inter-uniquifier
        ">
          {navLinks.map((link) => (
            <li
              key={link}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white cursor-pointer transition-colors duration-200 py-0.5"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Nav;