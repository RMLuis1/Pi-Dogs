import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DogCard from "./dogCard";
import { getDog } from "../redux/actions";
import styles from "./home.module.css";
import { Spinner } from "./Snipper";
import { Search } from "./search";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);

  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
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
                  temperament={e.temperament}
                />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
