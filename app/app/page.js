import Hero from "@/components/hero";
import Schedule from "@/components/schedule";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Schedule />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
