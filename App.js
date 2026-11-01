import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import "@/index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import WhyAuvra from "./components/WhyAuvra";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-[#F3F0E9] text-[#171717] min-h-screen">
        <div className="grain" aria-hidden="true" />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Work />
          <Process />
          <WhyAuvra />
          <Contact />
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#171717",
              color: "#F3F0E9",
              border: "1px solid #171717",
              borderRadius: "0",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
