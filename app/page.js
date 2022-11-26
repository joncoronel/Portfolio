import Space from "../components/sections/space";
import classes from "../styles/Home.module.scss";

export default function HomePage() {
  return (
    <div className={classes.spacing}>
      <h1> Home page</h1>
      <p>Somne content</p>
      <Space />
      <Space />
    </div>
  );
}
