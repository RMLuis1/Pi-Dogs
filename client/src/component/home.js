import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import Paginade from "./paginado";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allTemperament = useSelector((state) => state.temperaments);
  const [isLoading, setIsLoading] = useState(true);
  const [orden, setOrden] = useState("");

  const [pagina, setPagina] = useState(1);
  const [dogPorPagina] = useState(8);

  console.log("ESTO ES EN HOME:", dogPorPagina);
//Se realiza logica del paginado. Cada pagina debe contener 8 cards
  const indexUltimoDog = pagina * dogPorPagina; //8
  const indexPrimerDog = indexUltimoDog - dogPorPagina;
  const currentDog = allDogs.slice(indexPrimerDog, indexUltimoDog);

  const paginado = (pageNumber) => {
    setPagina(pageNumber);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  useEffect(() => {
    dispatch(getDog());
    // setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  useEffect(() => {
    setPagina(1);
  }, [allDogs]);

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
  //--------------------------------------------------------------------------------------------
  // const navToggle= document.getElementById("toggle")
  // const navMenu= document.getElementById("menu")
  // navToggle.addEventListener("click", ()=>{
  // navMenu.classlistName.toggle("menu_visible")
  // })
  function cambioEstilo() {
    //   const navMenu = document.getElementById("menu");
    // navMenu.className= styles.menu_visible
    const navMenu = document.getElementById("menu");
    navMenu.className
      ? (navMenu.className = styles.menu_visible)
      : (navMenu.className = styles.menu);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a className={styles.a} href="/home">
            {" "}
            <h1 className={styles.entrada}>
              DOGS....<span>&#160; </span>{" "}
            </h1>
          </a>
          <button
            onClick={() => {
              cambioEstilo();
            }}
            className={styles.toggle}
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </button>
          <ul id="menu" className={styles.menu || styles.menu_visible}>
            <li className={styles.item} key="search">
              <Search />
            </li>
            <li className={styles.item} key="crear">
              <a className={styles.a} href="/Create">
                <button className={styles.buttonCreate}>
                  Create dog breed
                </button>{" "}
              </a>
            </li>
          </ul>
         
        </nav>
      </header>
      <div className={styles.navbar}>
        <select
          className={styles.filtros}
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="All">Order alphabetically</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>
        <select
          className={styles.filtros}
          onChange={(e) => {
            handleSortPeso(e);
          }}
        >
          <option value="All">Sort by Weight</option>
          <option value="ascendente">upward</option>
          <option value="descendente">descending</option>
        </select>
        <select
          className={styles.filtros}
          onChange={(e) => handleTemperament(e)}
        >
          <option value="All">Temperament Filter</option>
          {allTemperament?.map((e) => (
            <option key={e.name} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <select className={styles.filtros} onChange={(e) => handleCreated(e)}>
          <option value="All">Dog breed filter</option>
          <option value="Created">Dogs Created</option>
          <option value="Api">Api</option>
        </select>
      </div>

      
      <Paginade
        dogPorPagina={dogPorPagina}
        allDogs={allDogs.length}
        paginado={paginado}
      />

      <div className={styles.dogsCard}>
        {currentDog.length > 0 ? (
          currentDog?.map((e) => {
            return (
              <div key={e.name}>
                <ul>
                  {" "}
                  <Link className={styles.linkName} to={`/home/${e.id}`}>
                    <DogCard
                      name={e.name}
                      image={e.image}
                      peso={e.peso}
                      temperament={
                        e.temperamentos
                          ? e.temperamentos.map((e) => e.name + ", ")
                          : e.temperament
                      }
                    />{" "}
                  </Link>
                </ul>
              </div>
            );
          })
        ) : (
          <div>
            <h1 className={styles.entrada2}>
              Content cannot be displayed at this time.Try again later.
            </h1>{" "}
          </div>
        )}
      </div>
      <Paginade
        dogPorPagina={dogPorPagina}
        allDogs={allDogs.length}
        paginado={paginado}
      />
        </div>
  );
}
