import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogID } from "../redux/actions";
import { Spinner } from "./Snipper";
import styles from "./dogsDetall.module.css"

export default function Dogs() {
  const dispatch = useDispatch();
  const { id } = useParams();

const [isLoading, setIsLoading] = useState (true);
  
useEffect(() => {
    dispatch(getDogID(id));
  }, [id, dispatch]);


  setTimeout(() => {
  setIsLoading(false);
}, 4000);

const dogsDetall = useSelector((state) => state.detallDog);
  console.log("ESTO ES DETALL: ",dogsDetall)

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NavLink to="/home">
        <button className={styles.buttonVolver}>Go back</button>
      </NavLink>
      <h1>Detail of the dog breed</h1>
      <div className={styles.div1}>
        {dogsDetall.length > 0 ? (
          <div className={styles.div2}>
            <img
              className={styles.img}
              width={450}
              height={400}
              src={dogsDetall[0].image}
              alt="Image no Found"
            />
            <h1>{dogsDetall[0].name}</h1>
            <p>
              <strong>Height: </strong> {dogsDetall[0].altura} Cm
            </p>
            <p>
              <strong>Weight: </strong> {dogsDetall[0].peso} Kg
            </p>
            <p>
              <strong>Years of life: </strong> {dogsDetall[0].año_de_vida}{" "}
            </p>
            <p>
              <strong>Temperament: </strong>
              {dogsDetall[0].temperament}
            </p>
          </div>
        ) : (
          "Loading...."
        )}
      </div>
    </div>
  );
}
