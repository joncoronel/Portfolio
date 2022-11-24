import classes from "./Navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className={classes.logo}>Logo</div>
          <div className={classes.content}>
            <ul className={classes.navLinks}>
              <li className={classes.link}>
                <Link href="/">About</Link>
              </li>
              <li className={classes.link}>
                <Link href="/">Work</Link>
              </li>
              <li className={classes.link}>
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
