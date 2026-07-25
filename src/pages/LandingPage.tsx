import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Preview from "../components/landing/Preview";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";
import { useScrollToHash } from "../hooks/useScrollToHash";

export default function LandingPage() {
  useScrollToHash();

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Preview />
        <CTA />
      </main>

      <Footer />
    </>
  );
}