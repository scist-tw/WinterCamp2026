import Hero from "@/components/hero";
import Intro from "@/components/intro";
import Course from "@/components/course";
import AcceptedList from "@/components/accepted-list";
import Gallery from "@/components/gallery";
import Team from "@/components/team";
import Partners from "@/components/partners";
import Info from "@/components/info";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <Course />
        <AcceptedList />
        <Gallery />
        <Team />
        <Partners />
        <Info />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
