import styles from "./navLink.module.scss";
import { m } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

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
  return (
    <m.li
      onClick={() => {
        props.setTab(props.link);
        props.setOpened(false);
      }}
      variants={variantsItem}
      whileTap={{ scale: 0.95 }}
      className={`${styles.link} ${
        props.tab === props.link ? styles.activeTab : ""
      } `}
    >
      <button className={styles.linkButton}>{props.link}</button>
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
    </m.li>
  );
}
