import styles from "./navLink.module.scss";
import { m } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-scroll";
//import { debounce } from "lodash";

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
      console.log(link);
      props.setTab(link);
    } else {
      console.log("attempted");
      return;
    }
  };

  /*const debouncedSearch = debounce(async (link) => {
    change(link);
  }, 0); */

  return (
    <m.li
      variants={variantsItem}
      whileTap={{ scale: 0.95 }}
      className={styles.link}
    >
      <Link
        to={props.link}
        onSetActive={() => {
          change(props.link);
        }}
        onClick={() => {
          props.setOpened(false);
        }}
        className={`${styles.linkButton} ${
          props.link === props.tab ? styles.activeTab : ""
        }`}
        spy={true}
        smooth={true}
        offset={-80}
        duration={0}
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
          />
        ) : null}
      </Link>
    </m.li>
  );
}
