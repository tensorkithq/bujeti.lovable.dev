import Header from "@/components/Header";
import Footer from "@/blocks/Footer";
import PricingWithManifesto from "@/blocks/PricingWithManifesto";

const Pricing = () => {
  return (
    <main className="min-h-screen bg-[#0D0F11]">
      <Header />
      <PricingWithManifesto />
      <Footer />
    </main>
  );
};

export default Pricing;