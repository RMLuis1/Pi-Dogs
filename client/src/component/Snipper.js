import styles from "./Spinner.module.css"

export function Spinner() {
  return (
    <div>
      <img
        className={styles.img}
        src="https://media4.giphy.com/avatars/robynmusto/akrl1NNNnNkM.gif"
        alt="Loading..."
      />
    </div>
  );
}
