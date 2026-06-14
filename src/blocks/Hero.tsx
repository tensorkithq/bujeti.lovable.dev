import React, { useRef } from "react";
import LaserFlow from "../components/LaserFlow";
import { Button } from "@/components/ui/button";

const HeroBottom = () => {
  return (
    <section className="absolute bottom-0 px-4 md:px-[15.3rem] w-full bg-transparent text-white overflow-hidden z-20">
      <div
        className="absolute top-0 left-0 w-full h-96 pointer-events-none"
        style={{
          filter: "blur(120px)",
        }}
      />

      {/* Additional subtle gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(159, 255, 89, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto py-8">
        <div className="text-left mb-8">
          <p className="text-gray-400 text-sm md:text-lg mb-4">
            Built for businesses at every stage:
          </p>

          {/* Desktop: flex-wrap layout */}
          <div className="hidden md:flex flex-wrap justify-start gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Expense Management</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                Payments Automation
              </span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Corporate Cards</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Bank Connect</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Invoicing</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Payroll</span>
            </div>
          </div>

          {/* Mobile: horizontal marquee scroll */}
          <div className="md:hidden mt-6 overflow-hidden">
            <div
              className="flex gap-4 pb-2 animate-marquee"
              style={{ width: "max-content" }}
            >
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Expense Management
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Payments Automation
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Corporate Cards
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Bank Connect
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Invoicing
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Payroll
                </span>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Expense Management
                </span>
              </div>
              <div className="flex items-center justify-center rounded-full px-6 py-3 min-w-fit">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  Payments Automation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroMockup = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          filter: "blur(80px)",
          opacity: 0.8,
          height: "250px",
        }}
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="curveGradient"
            x1="10%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(159, 255, 89, 0.6)" />
            <stop offset="30%" stopColor="rgba(158, 255, 89, 0.71)" />
            <stop offset="70%" stopColor="rgba(158, 255, 89, 0.5)" />
            <stop offset="100%" stopColor="rgba(158, 255, 89, 0.29)" />
          </linearGradient>
          <linearGradient
            id="curveGradient2"
            x1="50%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(158, 255, 89, 0.71)" />
            <stop offset="50%" stopColor="rgba(158, 255, 89, 0.5)" />
            <stop offset="100%" stopColor="rgba(158, 255, 89, 0.29)" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 C0,20 0,20 0,40 Q300,80 600,40 T1200,60 C1200,40 1200,20 1200,0 Q900,10 600,5 T0,0 Z"
          fill="url(#curveGradient)"
        />
        <path
          d="M0,0 C0,30 0,30 0,60 Q400,100 800,50 T1200,80 C1200,60 1200,30 1200,0 Q800,15 400,8 T0,0 Z"
          fill="url(#curveGradient2)"
        />
      </svg>
      <div className="relative flex w-full justify-start items-start align-left overflow-hidden rounded-lg md:rounded-2xl ring-1 ring-[rgba(159,255,89,0.62)] ring-inset ring-offset-1 ring-offset-[rgba(159,255,89,0.12)] shadow-2xl shadow-[rgba(159,255,89,0.1)]">
        <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl border-1 border-[rgba(159,255,89,0.12)]">
          <div className="relative w-full h-full bg-[#060010] overflow-hidden">
            <img
              src="/dashboard-mockup.png"
              alt="Beamline dashboard"
              className="w-full h-full object-cover"
              style={{
                filter:
                  "invert(100%) hue-rotate(200deg) brightness(100%) contrast(100%)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HeroBlock() {
  const revealImgRef = useRef(null);

  return (
    <>
      <div
        className="relative min-h-[600px] h-[88vh] md:h-[100vh] overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
          }
        }}
      >
        {/* Desktop LaserFlow */}
        <div className="hidden md:block">
          <LaserFlow
            horizontalBeamOffset={0.09}
            verticalBeamOffset={-0.153}
            color="#9fff59"
            horizontalSizing={0.5}
            verticalSizing={3}
            wispDensity={1}
            wispSpeed={15}
            wispIntensity={9}
            flowSpeed={0.45}
            flowStrength={0.158}
            /**
             * Fog intensity doesn't render well on Safari
             * Reduce to 0.002 for compatibility with Safari
             */
            fogIntensity={0.17}
            fogScale={0.578}
            fogFallSpeed={0.375}
            decay={1.5}
            falloffStart={1.5}
          />
        </div>

        {/* Mobile LaserFlow */}
        <div className="block md:hidden">
          <LaserFlow
            horizontalBeamOffset={0.203}
            verticalBeamOffset={-0.333}
            dpr={0.35}
            falloffStart={2.9}
            color="#9fff59"
            horizontalSizing={0.5}
            verticalSizing={2.6}
            wispDensity={7}
            wispSpeed={13}
            wispIntensity={7}
            flowSpeed={0.365}
            flowStrength={0.158}
            fogIntensity={0.97}
            fogScale={2.85}
            fogFallSpeed={1.1}
            decay={1.4}
            style={{ minHeight: "450px", width: "100%" }}
          />
        </div>

        {/* Hero Text Section */}
        <section className="absolute z-10 max-w-8xl mx-auto container left-0 top-[10%] md:top-[12%] lg:top-[15%] flex justify-center pointer-events-none">
          <div className="relative left-0 transform translate-x-0 lg:translate-x-8 4xl:translate-x-28 w-[100%] md:w-[67.11%] flex flex-col items-start text-left">
            <h1 className="font-bold text-white mb-4 md:mb-6 leading-tight text-[clamp(1.875rem,4vw,3.75rem)] sm:text-[clamp(3rem,5vw,3.75rem)] lg:text-[clamp(3.75rem,4.5vw,4rem)]">
              All your spend,
              <br />
              on one line
            </h1>
            <p
              className="text-gray-300 mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-xl mx-auto md:mx-0 px-0 relative ml-0"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              }}
            >
              Beamline is the financial command center for fast-moving teams —
              corporate cards, payments, payroll, and invoicing on one
              platform, so finance moves at the speed of the business.
            </p>
            <div className="relative inline-block p-[2px] rounded-3xl overflow-hidden ring-lime-200 ring-2 ring-accent/5 hover:ring-accent/40 transition-all duration-200 touch-manipulation">
              <div
                className="absolute -z-10 flex w-[204px] items-center justify-center pointer-events-none"
                style={{
                  transform: "translateX(114.203125px) translateZ(0px)",
                }}
              ></div>

              <div className="absolute top-1/2 right-0 h-[121px] w-[121px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%_,_#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]" />
              <div className="absolute top-1/2 right-0 h-[103px] w-[204px] -translate-y-1/2 bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,_#FFFFF7_29%,_#FFFACD_48.5%,_#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)] blur-[5px]" />
              <a href="/pricing-experimental" className="w-full z-10 pointer-events-auto">
              <Button
                className="relative z-10 pr-16 rounded-3xl bg-white text-black w-full hover:bg-gray-50 text-sm md:text-base font-medium transition-all duration-200 min-h-[38px] touch-manipulation"
                style={{
                  // bright lemon-green edges with white center + inner shine
                  background:
                    "linear-gradient(135deg, rgba(222,255,69,0.1) 0%, white 1%, white 72%, rgba(222,255,69,0.1) 100%)",
                  border: "1px solid rgba(222,255,69,0.16)",
                }}
              >
                SEE IN ACTION{" "}
                <span className="mb-0.5 ml-2 hover:pl-2 transition-all duration-200">
                  →
                </span>
              </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Product Mockup Section */}
        <div className="absolute top-[45%] md:top-[55%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[67.11%] z-6">
          <HeroMockup />
        </div>

        {/* Start Dotted Grid Effect */}
        <div
          className="absolute min-h-full inset-0"
          style={{
            background: `
          repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(222, 255, 69, 0.045) 2px,
          rgba(222, 255, 69, 0.045) 4px
          ),
          repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(222, 255, 69, 0.045) 2px,
          rgba(222, 255, 69, 0.045) 4px
          )
        `,
            mixBlendMode: "screen",
            opacity: 0.6,
            filter: "contrast(1.25) blur(0.2px)",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.4) 120px, rgba(255,255,255,0) 200px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.4) 120px, rgba(255,255,255,0) 200px)",
            // subtle overall glow tint
            boxShadow: "inset 0 0 120px rgba(222,255,69,0.03)",
          }}
        />
        {/* End Dotted Grid Effect */}

        {/* Start Reveal Effect */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "inherit",
            top: "-50%",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <img
            ref={revealImgRef}
            // Screenshot from Dribbble https://dribbble.com/shots/25900652-Qiespend-AI-Powered-Fintech-Dashboard
            src="https://cdn.dribbble.com/userupload/42921161/file/original-7c578605b303df0ab822981cede61ea9.png?resize=1024x768&vertical=center"
            // src="https://cdn.dribbble.com/userupload/42921159/file/original-b85951904fcd673fd818f99a8a32e661.png?resize=1024x768&vertical=center"
            alt="Reveal effect"
            style={{
              position: "absolute",
              width: "100%",
              top: "10%",
              "--mx": "-9999px",
              "--my": "-9999px",
              mixBlendMode: "lighten",
              opacity: 0.3,
              WebkitMaskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
              maskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
          {/* Very subtle effect, you almost won't notice it,
         but it's there, modify opacity to see it 
         */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              radial-gradient(circle, rgba(159, 255, 89, 0.8) 1px, transparent 1px),
              radial-gradient(circle, rgba(159, 255, 89, 0.4) 1px, transparent 1px)
            `,
              backgroundSize: "20px 20px, 10px 10px",
              backgroundPosition: "0 0, 5px 5px",
              mixBlendMode: "overlay",
              opacity: 0.062,
              left: "40%",
              width: "40%",
              filter: "blur(0.3px)",
              WebkitMaskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)",
              maskImage:
                "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.9) 80px, rgba(255,255,255,0.5) 160px, rgba(255,255,255,0) 240px)",
            }}
          />
          {/* End Reveal Effect */}
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, transparent 100%)",
          }}
        />
        <HeroBottom />
      </div>
    </>
  );
}
