import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles["hero__content"]}>
        <h1>Welcome to Clarestate</h1>
        <p>Let's find the perfect place for you</p>
        {/* <Link to="/all-properties">
          <button className="hero__btn">EXOLORE OUR PROPERTIES</button>
        </Link> */}
      </div>
    </div>
  );
}
