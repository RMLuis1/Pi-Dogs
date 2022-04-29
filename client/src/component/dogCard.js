import React from "react";
import styles from "./dogCard.module.css"

export default function DogCard({ image, name, peso, temperament }) {
  return (
    <div className={styles.dogCard} >
      <li className={styles.li}>
        <h3 className={styles.name} >{name}</h3>
        <img className={styles.Image} width={270} height={250} src={image} alt="Image not found" />
        <h4 className={styles.peso} >{peso}</h4>
        <p className={styles.temperament} >{temperament}</p>
      </li>
    </div>
  );
}
