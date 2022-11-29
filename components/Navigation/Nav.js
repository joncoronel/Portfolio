"use client";

import styles from "./Nav.module.scss";

import { useEffect, useState } from "react";
import Burger from "../misc/burger";

import { LazyMotion, m } from "framer-motion";

import Navlink from "./navLink";

const loadFeatures = () =>
  import("../misc/features.js").then((res) => res.default);

export default function Navbar() {
  const [tab, setTab] = useState("");
  const [small, setSmall] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        console.log("print");
        var currentScrollPos = window.pageYOffset;

        if (currentScrollPos > prevScrollpos) {
          // if scroll down hide the navbar
          setShow(false);
        } else {
          // if scroll up show the navbar
          setShow(true);
        }
        prevScrollpos = currentScrollPos;

        // remember current page location to use in the next move
      }
    };

    if (typeof window !== "undefined") {
      var prevScrollpos = window.pageYOffset;
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
    },
    closed: {
      opacity: 1,
      y: 0,
    },
  };

  const variantsList = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0 },
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
                    setShow={setShow}
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
