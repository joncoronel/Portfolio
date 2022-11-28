"use client";

import styles from "./Nav.module.scss";

import { useEffect, useState } from "react";
import Burger from "./misc/burger";

import { LazyMotion, m } from "framer-motion";

import Navlink from "./navLink";

const loadFeatures = () =>
  import("./misc/features.js").then((res) => res.default);

export default function Navbar() {
  const [tab, setTab] = useState("about");
  const [small, setSmall] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [opened, setOpened] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      setSmall(window.pageYOffset > 0);
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

  const navList = ["about", "work", "contact"];

  const variants = {
    open: {
      opacity: 1,
      y: "40%",
      transition: {
        y: { stiffness: 230, type: "spring" },
      },
    },
    closed: {
      opacity: 1,
      y: 0,
      transition: {
        y: { stiffness: 200, type: "spring" },
      },
    },
  };

  const variantsList = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
    closed: {
      transition: { staggerChildren: 0, staggerDirection: -1 },
    },
  };

  return (
    <>
      <div
        onClick={() => setOpened(!opened)}
        className={`${styles.overlay} ${opened ? styles.open : ""}`}
      ></div>
      <header
        className={`${styles.header} ${!show ? styles.hidden : ""} ${
          small ? styles.scrolled : ""
        }`}
      >
        <LazyMotion features={loadFeatures}>
          <m.nav
            animate={opened ? "open" : "closed"}
            variants={variants}
            className={`${styles.container} ${opened ? styles.open : ""}`}
          >
            <div className={styles.content}>
              <a className={styles.logo}>Logo</a>
              <div onClick={() => setOpened(!opened)} className={styles.burger}>
                <Burger opened={opened} setOpened={setOpened} />
              </div>
              <div className={styles.break}></div>

              <m.ul
                variants={variantsList}
                className={`${styles.navLinks} ${opened ? styles.open : ""}`}
              >
                {navList.map((link) => (
                  <Navlink
                    key={link}
                    tab={tab}
                    link={link}
                    setTab={setTab}
                    setOpened={setOpened}
                    opened={opened}
                  />
                ))}
              </m.ul>
            </div>
          </m.nav>
        </LazyMotion>
      </header>
    </>
  );
}
