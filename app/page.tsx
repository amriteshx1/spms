import { Commitment } from "./components/Commitment";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { WhySailanee } from "./components/WhySailanee";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Overview />
        <Services />
        <WhySailanee />
        <Process />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
