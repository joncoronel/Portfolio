import styles from "./navLink.module.scss";
import { m } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-scroll";

import { useEffect } from "react";
import throttle from "lodash.throttle";

export default function Navlink(props) {
  let variantsItem = {};

  const matches = useMediaQuery("(max-width: 800px)", true, {
    getInitialValueInEffect: true,
  });

  if (matches) {
    variantsItem = {
      open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100, duration: 0.18 },
        },
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      },
    };
  }

  const change = (link) => {
    if (props.tab !== link) {
      //console.log(link);
      props.setTab(link);
      props.setShow(true);
    } else {
      //console.log("attempted");
      return;
    }
  };

  useEffect(() => {
    const activate = () => {
      var current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });
      //console.log(current);
      change(current);
    };
    const sections = document.querySelectorAll("section");
    const throttledCount = throttle(activate, 100);
    //window.addEventListener("scroll", throttledCount);
    //return () => window.removeEventListener("scroll", throttledCount);

    window.onscroll = () => {
      throttledCount();
    };
  }, [props.tab]);

  return (
    <m.li
      variants={variantsItem}
      whileTap={{ scale: 0.95 }}
      className={styles.link}
    >
      <Link
        to={props.link}
        onClick={() => {
          props.setOpened(false);
        }}
        className={`${styles.linkButton} ${
          props.link === props.tab ? styles.activeTab : ""
        }`}
        spy={true}
        smooth={true}
        offset={-80}
        duration={300}
        ignoreCancelEvents={true}
      >
        {props.link}
        {props.tab === props.link && props.opened ? (
          <m.div
            key={"mobile"}
            className={styles.underline}
            layoutId="underline"
          />
        ) : null}
        {props.tab === props.link && !props.opened && !matches ? (
          <m.div
            key={"desktop"}
            className={styles.underline}
            layoutId="underline"
            transition={{ type: "spring", bounce: 0.45, duration: 0.25 }}
          />
        ) : null}
      </Link>
    </m.li>
  );
}
