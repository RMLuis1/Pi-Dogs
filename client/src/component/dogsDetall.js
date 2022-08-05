/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDeleted, getDogID } from "../redux/actions";
import { Spinner } from "./Snipper";
import styles from "./dogsDetall.module.css";

export default function Dogs() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [block, setBlocñ] = useState(false);

  useEffect(() => {
    dispatch(getDogID(id));
  }, [id, dispatch]);

  setTimeout(() => {
    setIsLoading(false);
  }, 4000);

  const dogsDetall = useSelector((state) => state.detallDog);
  console.log("ESTO ES DETALL: ", dogsDetall);

  function handleDeleted(e) {
    e.preventDefault();
    dispatch(getDogDeleted(e.target.value));
    alert("Dog deleted successfully!");
    navigate("/home");
  }

  // function handleChange(e){
  // set
  // }

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
       <NavLink to="/home">
        <button className={styles.buttonVolver}>Go back</button>
      </NavLink>
      <div className={styles.h1}>
        {" "}
        <h1 className={styles.entrada}>
          DESCRIPTION OF THE DOG <span>&#160; </span>{" "}
        </h1>
      </div>
      <div >
        {!Number(dogsDetall[0].id) ? (
          <button
            className={styles.remover}
            value={dogsDetall[0].id}
            onClick={(e) => handleDeleted(e)}
          >
            Remove
          </button>
        ) : (
          ""
        )}
      </div>

      <div >
        {dogsDetall.length > 0 ? (
          <div className={styles.div2}>
            <img
              className={styles.img}
              // width={450}
              // height={400}
              src={dogsDetall[0].image}
              alt="Image no Found"
            />
            <div className={styles.detalles}>
              <h1 className={styles.title}>{dogsDetall[0].name}</h1>
              <p>
                <strong>Height: </strong> {dogsDetall[0].altura} Cm
              </p>
              <p>
                <strong>Weight: </strong> {dogsDetall[0].peso} Kg
              </p>
              <p>
                <strong>Years of life: </strong> {dogsDetall[0].añosDeVida}{" "}
                Years
              </p>
              <strong>Temperament: </strong>
              {dogsDetall[0].temperament ? (
                <p>
                  {dogsDetall[0].temperament
                    ? dogsDetall[0].temperament
                    : "No Temperament!"}
                </p>
              ) : (
                dogsDetall[0].temperamentos.map((e) => {
                  return e.name + " ";
                })
              )}
            </div>
          </div>
        ) : (
          "Loading...."
        )}
      </div>
    </div>
  );
}
