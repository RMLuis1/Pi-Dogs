import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DogCard from "./dogCard";
import {
  filterAlphabetically,
  filterCreate,
  filterTemperament,
  filterWeight,
  getDog,
  getTemperament,
} from "../redux/actions";
import styles from "./home.module.css";
import { Spinner } from "./Snipper";
import { Search } from "./search";
// import Paginado from "./paginado";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allTemperament = useSelector((state) => state.temperaments);
  const [isLoading, setIsLoading] = useState(true);
  const [orden, setOrden] = useState("");

  // const [dogPagina, setDogPagina] = useState(1);
  // const [dogPorPagina, setDogPorPagina] = useState(8);

  // const indexUltimoDog = dogPagina * dogPorPagina;
  // const indexPrimerDog = indexUltimoDog - dogPorPagina;
  // const currentDog = allDogs.slice(indexPrimerDog, indexUltimoDog);

  // const paginado = (pageNumber) => {
  //   setDogPagina(pageNumber);
  // };

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  //----------------------------------------------------------------------------------------
  //!filtrado por Alfabeto

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterAlphabetically(e.target.value));
    // setDogPagina(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  //----------------------------------------------------------------------------------------
  //!filtrado por peso

  function handleSortPeso(e) {
    e.preventDefault();
    dispatch(filterWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //----------------------------------------------------------------------------------------
  //!filtro por temperamentos
  function handleTemperament(e) {
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //---------------------------------------------------------------------------------------
  //!filtro por db y api
  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterCreate(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dogs</h1>
        <div className={styles.search}>
          {" "}
          <Search />{" "}
        </div>

        <div className={styles.create}>
          <NavLink to="/Create">
            {" "}
            <button className={styles.buttonCreate}>
              Create dog breed
            </button>{" "}
          </NavLink>
        </div>
      </header>
      <div>
        <div className={styles.navbar}>
          <select
            onChange={(e) => {
              handleSort(e);
            }}
          >
            <option value="">Orden ALfabetico</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
          </select>
          <select
            onChange={(e) => {
              handleSortPeso(e);
            }}
          >
            <option value="">Peso</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
          <select onChange={(e) => handleTemperament(e)}>
            <option value="All">Temperament Filter</option>
            {allTemperament?.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <select onChange={(e) => handleCreated(e)}>
            <option value="All">Dog breed filter</option>
            <option value="Created">Dogs Created</option>
            <option value="Api">Api</option>
          </select>
        </div>

        {/* <div className={styles.paginado}>
          <Paginado
            dogPorPagina={dogPorPagina}
            allDogs={allDogs.length}
            paginado={paginado}
          />
        </div> */}

        <div className={styles.dogsCard}>
          {allDogs?.map((e) => {
            return (
              <div key={e.name}>
                <ul>
                  <DogCard
                    name={
                      <Link className={styles.linkName} to={`/home/${e.id}`}>
                        {e.name}
                      </Link>
                    }
                    image={e.image}
                    peso={e.peso}
                    temperament={
                      e.temperamentos
                        ? e.temperamentos.map((e) => e.name)
                        : e.temperament
                    }
                
                  />
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
