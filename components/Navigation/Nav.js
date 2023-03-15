"use client";

import styles from "./Nav.module.scss";

import { useEffect, useState } from "react";
import Burger from "../misc/burger";

import { LazyMotion, m } from "framer-motion";

import Navlink from "./navLink";
import Image from "next/image";
import Logo from "../../Images/logofinal.svg";
import throttle from "lodash.throttle";

const loadFeatures = () =>
  import("../misc/features.js").then((res) => res.default);

export default function Navbar() {
  const [tab, setTab] = useState("");
  const [small, setSmall] = useState(false);
  const [show, setShow] = useState(true);

  const [opened, setOpened] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.pageYOffset > 60) {
        if (!small) {
          setSmall(true);
        }
      } else {
        if (small) {
          setSmall(false);
        }
      }
    }
  };

  useEffect(() => {
    controlNavbar();

    const throttledScroll = throttle(controlNavbar, 100);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", throttledScroll);
      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [small]);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened]);

  const navList = ["about", "work", "contact"];

  const variants = {
    open: {
      y: "40%",
    },
    closed: {
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
      <LazyMotion features={loadFeatures}>
        <m.header
          animate={opened ? "open" : "closed"}
          variants={variants}
          className={`${styles.header} ${!show ? styles.hidden : ""} `}
        >
          <nav
            className={`${styles.container} ${opened ? styles.open : ""} ${
              small ? styles.scrolled : ""
            }`}
          >
            <div className={styles.content}>
              <a className={styles.logo}>
                <Image
                  className={styles.logoDirect}
                  priority="true"
                  alt="Website Logo"
                  src={Logo}
                  fill
                />
              </a>
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
          </nav>
        </m.header>
      </LazyMotion>
    </>
  );
}
