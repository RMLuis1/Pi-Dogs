import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDogs, getTemperament } from "../redux/actions";
import styles from "./createDogs.module.css";

export default function CreateDogs() {
  const dispatch = useDispatch();
  // const dogsCreate = useSelector((state) => state.dogs);
  const allTemperament = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    alturaMin: "",
    alturaMax: "",
    pesoMin: "",
    pesoMax: "",
    añosMin: "",
    añosMax: "",
    image: "",
    temperament: [],
  });

  const [inputError, setInputError] = useState({});
  //---------------------------------------------------------------------------------------------------------
  //! SELECT TEMPERAMENT
  function handleTemperament(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }
  //---------------------------------------------------------------------------------------------------------
  function handleChange(e) {
    //!va a manejar los cambios de imput(los guarda!)
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const errors = validate(newInput);
      setInputError(errors);
      return newInput;
    });
    console.log(input);
  }

  //---------------------------------------------------------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.alturaMin ||
      !input.alturaMax ||
      !input.pesoMin ||
      !input.pesoMax ||
      !input.añosMin ||
      !input.añosMax ||
      !input.image ||
      !input.temperament
    ) {
      return alert("Todos los campos son obligatorios");
    } else {
      dispatch(createDogs(input));
      alert("Dog breed created successfully!");
      setInput({
        ...input,
        name: "",
        alturaMin: "",
        alturaMax: "",
        pesoMin: "",
        pesoMax: "",
        añosMin: "",
        añosMax: "",
        image: "",
        temperament: [],
      });
    }
  }
  //---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(createDogs(input));
  // }, [dispatch]);

  //-----------------------------------------------Validaciones-------------------------------------------
  //!Validaciones
  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "Name is required";
    } else if (!/^[A-Z]+$/i.test(input.name)) {
      error.name = "Name is invalid";
    }
    if (!input.alturaMin) {
      error.alturaMin = "Altura Minima is required";
    } else if (input.alturaMin < 1 || input.alturaMin > 40) {
      error.alturaMin = "Altura Minima is number 1 - 40";
    }
    if (!input.alturaMax) {
      error.alturaMax = "Altura Maxima is required";
    } else if (input.alturaMax < 41 || input.alturaMax > 100) {
      error.alturaMax = "Altura Maxima is number 41 - 100";
    }
    if (!input.pesoMin) {
      error.pesoMin = "Peso Minimo is required";
    } else if (input.pesoMin < 1 || input.pesoMin > 40) {
      error.pesoMin = "Peso Minimo is number 1 - 40";
    }
    if (!input.pesoMax) {
      error.pesoMax = "Peso Maximo is required";
    } else if (input.pesoMax < 41 || input.pesoMax > 100) {
      error.pesoMax = "Peso Maximo is number 41 - 100";
    }
    if (!input.añosMin) {
      error.añosMin = "Años minimo de vida is required";
    } else if (input.añosMin < 1 || input.añosMin > 15) {
      error.añosMin = "Años minimo de vida is number 1 - 15";
    }
    if (!input.añosMax) {
      error.añosMax = "Años Maximo de vida is required";
    } else if (input.añosMax < 16 || input.añosMax > 100) {
      error.añosMax = "Años Maximo de vida is number 16 - 100";
    }

    return error;
  }
  //--------------------------------------------------------------------------------------------------------

  return (
    <div className={styles.divM}>
      <Link to="/home">
        <button className={styles.volver}>Go back</button>
      </Link>
      <br />
      <h1 className={styles.h1t}>Create </h1>
      <div className={styles.div2}>
        <form onSubmit={handleSubmit}>
          <div>
            <labe>Name: </labe>
            <input
              className={
                (inputError.name && styles.inputdanger) || styles.input
              }
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {inputError.name && (
              <p className={styles.danger}>{inputError.name}</p>
            )}
          </div>

          <div>
            <div>
              <labe>Altura Minima: </labe>
              <input
                className={
                  (inputError.alturaMin && styles.inputdanger) || styles.input
                }
                type="text"
                name="alturaMin"
                value={input.alturaMin}
                onChange={handleChange}
                min="1"
                max="40"
              />
              {inputError.alturaMin && (
                <p className={styles.danger}>{inputError.alturaMin}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <labe>Altura Maxima: </labe>
              <input
                className={
                  (inputError.alturaMax && styles.inputdanger) || styles.input
                }
                type="text"
                name="alturaMax"
                value={input.alturaMax}
                min="41"
                max="100"
                onChange={handleChange}
              />
              {inputError.alturaMax && (
                <p className={styles.danger}>{inputError.alturaMax}</p>
              )}
            </div>
          </div>

          <div>
            <div>
              <labe>Peso Mainimo: </labe>
              <input
                className={
                  (inputError.pesoMin && styles.inputdanger) || styles.input
                }
                type="text"
                name="pesoMin"
                value={input.pesoMin}
                min="1"
                max="40"
                onChange={handleChange}
              />
              {inputError.pesoMin && (
                <p className={styles.danger}>{inputError.pesoMin}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <labe>Peso Maximo: </labe>
              <input
                className={
                  (inputError.pesoMax && styles.inputdanger) || styles.input
                }
                type="text"
                name="pesoMax"
                min="41"
                max="100"
                value={input.pesoMax}
                onChange={handleChange}
              />
              {inputError.pesoMax && (
                <p className={styles.danger}>{inputError.pesoMax}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <labe>Años de vida Minimo: </labe>
              <input
                className={
                  (inputError.añosMin && styles.inputdanger) || styles.input
                }
                type="text"
                name="añosMin"
                value={input.añosMin}
                min="1"
                max="15"
                onChange={handleChange}
              />
              {inputError.añosMin && (
                <p className={styles.danger}>{inputError.añosMin}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <labe>Años de vida Maximo: </labe>
              <input
                className={
                  (inputError.añosMax && styles.inputdanger) || styles.input
                }
                type="text"
                name="añosMax"
                value={input.añosMax}
                min="16"
                max="100"
                onChange={handleChange}
              />
              {inputError.añosMax && (
                <p className={styles.danger}>{inputError.añosMax}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <labe>Image </labe>
              <input
                className={
                  (inputError.image && styles.inputdanger) || styles.input
                }
                onChange={handleChange}
                type="text"
                name="image"
                value={input.image}
              />
            </div>
          </div>
          <div>
            <div>
              <labe>Temperamentos </labe>
              <select
                className={styles.input}
                onChange={(e) => handleTemperament(e)}
              >
                {allTemperament?.map((e) => {
                  return (
                    <option value={e.name} key={e.id} multiple="multiple">
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <ul>
                <li className={styles.input}>
                  {input.temperament.map((e) => e + " ,")}{" "}
                </li>
              </ul>
            </div>
          </div>
          <button className={styles.submit} type="submit">
            Crete Dogs
          </button>
        </form>
      </div>
    </div>
  );
}
