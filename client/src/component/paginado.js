import React from "react";
import styles from "./paginado.module.css";

export default function Paginado({ DogPorPagina, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allDogs / DogPorPagina); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumber.map((number) => (
          <li className={styles.paginado} key={number}>
            <button
              className={styles.buttonpaginado}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
