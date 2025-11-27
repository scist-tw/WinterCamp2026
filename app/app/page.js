import Hero from "@/components/hero";
import Course from "@/components/course";
import Pricing from "@/components/pricing";
import Gallery from "@/components/gallery";
import Team from "@/components/team";
import Info from "@/components/info";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Course />
      <Pricing />
      <Gallery />
      <Team />
      <Info />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
