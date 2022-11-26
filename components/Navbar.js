"use client";

import classes from "./Navbar.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import Burger from "./misc/burger";

export default function Navbar() {
  const [small, setSmall] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [opened, setOpened] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      setSmall(window.pageYOffset > 60);
      if (small) {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setShow(false);
        } else {
          // if scroll up show the navbar
          setShow(true);
        }
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <div
        onClick={() => setOpened(!opened)}
        className={`${classes.overlay} ${opened ? classes.open : ""}`}
      ></div>
      <header
        className={`${classes.header} ${!show ? classes.hidden : ""} ${
          small ? classes.scrolled : ""
        }`}
      >
        <nav className={classes.nav}>
          <div className={classes.container}>
            <div className={classes.logo}>Logo</div>
            <div className={classes.content}>
              <ul
                className={`${classes.navLinks} ${opened ? classes.open : ""}`}
              >
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
              <div
                onClick={() => setOpened(!opened)}
                className={classes.burger}
              >
                <Burger opened={opened} setOpened={setOpened} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
