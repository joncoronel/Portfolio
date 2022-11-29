import Space from "../components/sections/space";
import classes from "../styles/Home.module.scss";
import About from "../components/sections/About";
import Work from "../components/sections/Work";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <div className={classes.spacing}>
      <h1> Home page</h1>
      <p>Somne content</p>
      <About />
      <Work />
      <Contact />
      <Space />
    </div>
  );
}
