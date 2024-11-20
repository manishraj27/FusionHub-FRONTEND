import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NotFound = () => {
  const [showExtras, setShowExtras] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    const text = "SEEMS LIKE YOU GOT LOST :(";
    const words = text
      .split(" ")
      .map(
        (word) =>
          `<span style="display: inline-block; white-space: pre;">${word}</span>`
      )
      .join(" ");

    if (messageRef.current) {
      messageRef.current.innerHTML = words;

      gsap.fromTo(
        messageRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.0,
          ease: "power3.out",
          onComplete: () => setShowExtras(true),
        }
      );
    }

    gsap.fromTo(
      ".container",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut", delay: 0.5 }
    );
  }, []);

  return (
    <main className="container relative flex h-screen items-center justify-center px-8 text-accent-400">
      <div className="grid w-full grid-cols-1 gap-8 pb-20 lg:grid-cols-2">
        {/* Left Section: Main Message */}
        <div className="relative">
          {/* Text container */}
          <div className="text-container">
            <p
              ref={messageRef}
              className="mb-6 space-y-2 text-4xl font-bold leading-tight lg:text-6xl"
              style={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
              aria-live="assertive"
            >
              {/* Text will be animated here */}
            </p>
          </div>

          {/* Button container */}
          {showExtras && (
            <div className="button-container absolute origin-bottom-right">
              <a
                href="/"
                className="inline-block transform rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl"
              >
                HEAD BACK HOME
              </a>
            </div>
          )}
        </div>

        {/* Right Section: 404 Error Message */}
        {showExtras && (
          <div className="fade-in mt-16 flex flex-col items-start justify-center text-lg text-gray-400 lg:mt-0 lg:items-end lg:pr-8 lg:text-xl">
            <p className="3xl:max-w-full max-w-[28ch] lg:max-w-[20ch]">
              404 Error. The page you’re looking for does not exist.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default NotFound;
