import Header from "@/components/Header";
import UseCasesSection from "@/components/UseCasesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UseCasesSection standalone />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default UseCases;
