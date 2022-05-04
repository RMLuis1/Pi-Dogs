import React from "react";
import styles from "./paginado.module.css";

export default function Paginade({ dogPorPagina, allDogs, paginado }) {
  const pageNumber = [];
console.log("ESTO ES DOGPORPAGINA", dogPorPagina)
console.log("ESTO ES ALLDOGS:",allDogs)



  for (let i = 1; i <= Math.ceil(allDogs / dogPorPagina); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumber && pageNumber.map((number) => (
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
