import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "var(--background)",
        }}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(var(--accent-rgb), 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb), 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "99px",
            background: "rgba(var(--accent-rgb), 0.04)",
            filter: "blur(120px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "99px",
            background: "rgba(var(--accent-rgb), 0.04)",
            filter: "blur(100px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <Hero />
          <About />
          <Stack />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
