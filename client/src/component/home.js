import React from "react";
import { Link, NavLink } from "react-router-dom";
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
  const [dogPorPagina ] = useState(8);

  console.log("ESTO ES EN HOME:",dogPorPagina)

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  useEffect(()=>{
    setPagina(1)
  },[allDogs])

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
  //--------------------------------------------------------------------------------------------

  
  return (
    <div className={styles.container}>
      <img
        className={styles.fondodeportada}
        src="https://thumbs.dreamstime.com/b/patr%C3%B3n-impecable-con-rayas-punteadas-e-impresiones-realistas-de-la-pata-perro-fondo-plano-m%C3%ADnimo-huella-mascota-y-huesos-color-176649109.jpg"
        alt="Not found"
      />

      {/* <header className={styles.header}> */}
      <div className={styles.titulos} > 
      <h1 className={styles.entrada}>DOGS<span >&#160; </span> </h1> 
      </div>
      
      <div className={styles.search}>
        {" "}
        <Search />{" "}
      </div>

      <div className={styles.create}>
        <NavLink to="/Create">
          {" "}
          <button className={styles.buttonCreate}>Create dog breed</button>{" "}
        </NavLink>
      </div>
      {/* </header> */}
      {/* <div> */}
      <div className={styles.navbar}>
        <select
          className={styles.filtros}
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="">Orden ALfabetico</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>
        <select
          className={styles.filtros}
          onChange={(e) => {
            handleSortPeso(e);
          }}
        >
          <option value="">Peso</option>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
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

      {/* <div className={styles.paginado}> */}
      <Paginade
        dogPorPagina={dogPorPagina}
        allDogs={allDogs.length}
        paginado={paginado}
      />

      {/* </div> */}

      <div className={styles.dogsCard}>
        {currentDog?.map((e) => {
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
        })}
      </div>
      <Paginade
        dogPorPagina={dogPorPagina}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      {/* </div> */}
    </div>
  );
}
