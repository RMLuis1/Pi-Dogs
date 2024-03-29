/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import styles from "./dogCard.module.css";

export default function DogCard({
  image,
  name,
  peso,
  temperament,
  temperamentos,
}) {
  return (
    <div className={styles.dogCard}>
      <li className={styles.li}>
        <h3 className={styles.name}>{name}</h3>
        <img
          className={styles.Image}
          width={270}
          height={250}
          src={image}
          alt="Image not found"
        />
        <h4 className={styles.peso}>
          <strong>Weight: </strong>
          {peso}
        </h4>
        <p className={styles.temperament}>{temperament}</p>
        <p className={styles.temperament}>{temperamentos}</p>
      </li>
    </div>
  );
}
