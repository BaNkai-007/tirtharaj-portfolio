import Hero from '../sections/Hero/Hero';
import Projects from '../sections/Projects/Projects';
import Skills from '../sections/Skills/Skills';
import About from '../sections/About/About';
import Contact from '../sections/Contact/Contact';
import NeuralCanvas from '../components/NeuralCanvas';
import './AsymmetricShell.css';

export default function AsymmetricShell() {
  return (
    <main className="shell">
      <NeuralCanvas />
      <section className="shell__hero">
        <Hero />
      </section>

      <section className="shell__projects">
        <Projects />
      </section>

      <section className="shell__skills">
        <Skills />
      </section>

      <section className="shell__about">
        <About />
      </section>

      <section className="shell__contact">
        <Contact />
      </section>
    </main>
  );
}
