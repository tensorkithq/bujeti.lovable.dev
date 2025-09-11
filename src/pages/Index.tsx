import Hero from "../blocks/Hero";
import Features from "../blocks/Features";
import Header from "../components/Header";
import Footer from "@/blocks/Footer";

const Index = () => {
  return (
    <main className="min-h-[100vh] relative ">
      <header className="relative">
        <Header />
        <Hero />
      </header>
      <Features />
      <section className="bg-white text-black py-16" />
      <Footer />
    </main>
  );
};

export default Index;
