import Hero from "./components/hero";
import Projects from "./components/projects";


export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero />
      <Projects />
    </main>
  );
}
