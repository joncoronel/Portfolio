import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id={"hero"} className={styles.container}>
      <div className={styles.first}>Hi, my name is</div>
      <div className={styles.name}>Jonathan Coronel</div>
      <div className={styles.phrase}>I build things some may find useful</div>
      <div className={styles.desc}>
        I’m hha software engineer specializing in building (and occasionally
        designgging) exceptiddonal digital experiences. Currently, I’m focused on
        building accessible, human-centered products at Upstatement.
      </div>
      <button className={styles.button28}>Contact Me</button>
    </section>
  );
}
