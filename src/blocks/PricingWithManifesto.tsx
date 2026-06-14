import React, { useState } from "react";
import NestedBorderPricingCard from "@/components/NestedBorderPricingCard";

const ManifestoText = () => {
  return (
    <div className="relative overflow-hidden   pb-[200px] pt-[212px] lg:pb-[160px] lg:pt-[168px] md:pt-[145px] sm:pt-[109px]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-3xl leading-relaxed text-white lg:text-2xl md:text-xl sm:text-lg">
          <p>
            Beamline exists to make company money programmable. Cards,
            payments, payroll, and invoicing run on one platform — priced so
            you only pay for what your team actually uses.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Plans scale with seats and payment volume. No setup fees, no
            per-feature surprises — every charge is metered transparently, so
            finance always knows the bill before it lands.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>Switching is free: migration and onboarding are on us.</p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>
            Coming soon:{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Beamline AI and Beamline Autopilot
            </span>{" "}
            — close your books, flag anomalies, and draft approvals
            automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

const pricingPlans = [
  {
    name: "Basic",
    price: "₦8,400",
    description:
      "Get started with essential tools to manage your business expenses.",
    features: [
      "2 users",
      "₦3,000 per additional user",
      "Pay-in fees: 0.15% capped at ₦500",
      "Payout fees: ₦50",
      "2 bank accounts",
      "3 levels of approvals management",
      "2 expense policies",
      "Basic support",
    ],
    buttonText: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    price: "₦16,800",
    description:
      "Advanced features for growing businesses that need more control.",
    features: [
      "3 users",
      "₦5,000 per additional user",
      "Pay-in fees: 0.1% capped at ₦200",
      "Payout fees: ₦25",
      "5 bank accounts",
      "5 levels of approvals management",
      "15 expense policies",
      "Custom roles",
      "Bills automation",
      "Integrations",
      "Standard support",
    ],
    buttonText: "Get started",
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    description:
      "Tailored solutions for large enterprises with specific needs.",
    features: [
      "Custom users",
      "Custom cost per additional user",
      "Custom pay-in fees",
      "Custom payout fees",
      "Custom bank accounts",
      "Custom approvals management",
      "Custom expense policies",
      "Custom roles",
      "Bills automation",
      "Integrations",
      "Premium support",
    ],
    buttonText: "Contact sales",
    featured: false,
  },
];

// Define border colors for each plan
const borderColors = {
  Basic: { outerColor: "#00d4ff", innerColor: "#00d4ff" },
  Pro: { outerColor: "#ff6b9d", innerColor: "#ff6b9d" },
  Business: { outerColor: "#a855f7", innerColor: "#a855f7" },
};

const PricingWithManifesto = () => {
  const [selectedPlan, setSelectedPlan] = useState("Pro"); // Default to 'Pro'

  return (
    <>
      <style>{`
        .no-scrollbars {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .no-scrollbars::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
      <div className="overflow-hidden">
        <ManifestoText />
        <div
          className="safe-paddings relative left-1/2 z-10 -ml-[50vw] w-screen [mask-image:linear-gradient(270deg,rgba(115,115,115,0.00)_9.82%,#D9D9D9_30.43%,#D9D9D9_78.87%,rgba(217,217,217,0.00)_99.54%)] sm:[mask-image:none]"
          style={{
            paddingTop: "96px",
            paddingBottom: "48px",
            marginTop: "-160px",
            marginBottom: "0px",
            overflow: "hidden",
          }}
        >
          <div
            className="max-w-7xl mx-auto relative"
            style={{ height: "100%" }}
          >
            <h2 className="sr-only">Beamline pricing plans</h2>
            <div className="relative xs:px-5" style={{ overflow: "hidden" }}>
              <div
                className="no-scrollbars flex snap-x snap-mandatory"
                style={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  marginLeft: "calc((100vw - 100%) / -2)",
                  marginRight: "calc((100vw - 100%) / -2)",
                  paddingLeft: "calc((100vw - 100%) / 2)",
                  paddingRight: "calc((100vw - 100%) / 2)",
                }}
              >
                <section
                  className="flex w-max flex-shrink-0 gap-8 md:gap-6 sm:gap-4 items-start"
                  style={{ paddingTop: "20px", paddingBottom: "20px" }}
                >
                  {pricingPlans.map((plan) => {
                    const colors =
                      borderColors[plan.name as keyof typeof borderColors];
                    return (
                      <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        style={{
                          cursor: "pointer",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          minHeight: "500px",
                        }}
                      >
                        <NestedBorderPricingCard
                          plan={plan}
                          {...colors}
                          isSelected={selectedPlan === plan.name}
                        />
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white overflow-hidden text-left text-xl leading-relaxed max-w-4xl  mx-auto px-4 py-24">
          <p>
            Our Custom Plan is tailored to meet your unique needs and
            requirements. Get specific features, extra storage, or enhanced
            support. Flexible pricing based on your specifications.
          </p>
          <div className="my-16 lg:my-14 md:my-12 sm:my-8"></div>
          <p>Ready to discuss your needs and get a personalized quote?</p>
          <div className="mt-8">
            <a
              href="mailto:hello@beamline.app"
              className="text-accent hover:underline"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingWithManifesto;
