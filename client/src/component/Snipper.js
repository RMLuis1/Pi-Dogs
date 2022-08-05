import styles from "./Spinner.module.css";

export function Spinner() {
  return (
    <div>
      <img
        className={styles.img}
        src="https://i.pinimg.com/originals/d2/99/40/d2994005233783287041f6b90980546b.gif"
        alt="Loading..."
      />
    </div>
  );
}
