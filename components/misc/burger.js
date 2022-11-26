import { Burger } from "@mantine/core";
import classes from "./burger.module.scss";

export default function burger(props) {
  const title = props.opened ? "Close navigation" : "Open navigation";

  return (
    <Burger
      opened={props.opened}
      title={title}
      classNames={{ burger: `${classes.burger}` }}
      size={30}
    />
  );
}
