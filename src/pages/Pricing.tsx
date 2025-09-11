import Header from "../components/Header";

const Pricing = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative">
        <Header />
        <div className="pt-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Pricing</h1>
            <p className="text-center text-muted-foreground">Choose the plan that's right for you</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pricing;