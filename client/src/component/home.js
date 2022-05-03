import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DogCard from "./dogCard";
import { filterAlphabetically, getDog } from "../redux/actions";
import styles from "./home.module.css";
import { Spinner } from "./Snipper";
import { Search } from "./search";
// import Paginado from "./paginado";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const [isLoading, setIsLoading] = useState(true);
  const [orden, setOrden ]= useState("")
  
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

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
//----------------------------------------------------------------------------------------
//!filtrado por Alfabeto

function handleSort(e){
e.preventDefault()
dispatch(filterAlphabetically(e.target.value))
// setDogPagina(1);
setOrden(`Ordenado ${e.target.value}`)
}

//----------------------------------------------------------------------------------------


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
          <select onChange={(e)=>{handleSort(e)}} >
            <option value="">Orden ALfabetico</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
          </select>
          <select>
            <option value="">Peso</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
          <select>
            <option>Temperament Filter</option>
            <option></option>
          </select>
          <select>
            <option>Dog breed filter</option>
            <option></option>
            <option></option>
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
              <div key={e.id}>
                <ul>
                  <DogCard
                    name={
                      <Link className={styles.linkName} to={`/home/${e.id}`}>
                        {e.name}
                      </Link>
                    }
                    image={e.image}
                    peso={e.peso}
                    //!VER SI O SI TEMPERAMENT=> NO MUESTRA LOS TEMPERAMENTOS DE LOS
                    //!PERROS CREADOS! 
                    //!LOS DE LA API LOS MUESTRA CON SOLO PONER e.temperament....
                    temperament={e.temperamentos? 
                       e.temperamentos.map(e=> e.name): e.temperament}
                    button={<Link to={`/home/${e.id}`} />}
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
