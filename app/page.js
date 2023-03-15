import Space from "../components/sections/space";
import classes from "../styles/Home.module.scss";
import About from "../components/sections/About";
import Work from "../components/sections/Work";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";

export default function HomePage() {
  return (
    <div className={classes.spacing}>
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
}
