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

  const [error, setError] = useState({});
  //----------------------------------------------------------------------------------------------------------
  //! DELETED TEMPERAMENT
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e.target.value),
    });
    console.log("ESTO ES DELET", e);
  }

  //---------------------------------------------------------------------------------------------------------
  //! SELECT TEMPERAMENT
  function handleTemperament(e) {
    setInput({
      ...input,
      temperament: input.temperament.includes(e.target.value)
        ? [...input.temperament]
        : [...input.temperament, e.target.value],
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
      setError(errors);
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
      // !input.image ||
      !input.temperament.length
    ) {
      return alert("Todos los campos son obligatorios");
    }
    if (error.name) {
      return alert("Name invalidos"), console.log(error);
    }
    if (error.alturaMin) {
      return alert("Altura Minima invalidos"), console.log(error);
    }
    if (error.alturaMax) {
      return alert("Altura Maxima invalidos"), console.log(error);
    }
    if (error.pesoMin) {
      return alert("Peso Minimo invalidos"), console.log(error);
    }
    if (error.pesoMax) {
      return alert("Peso Maximo invalidos"), console.log(error);
    }
    if (error.añosMin) {
      return alert("Años Minimo invalidos"), console.log(error);
    }
    if (error.añosMax) {
      return alert("Años Maaximo invalidos"), console.log(error);
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
      setError({});
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
    } else if (!input.alturaMin) {
      error.alturaMin = "Altura Minima is required";
    } else if (input.alturaMin < 1 || input.alturaMin > 40) {
      error.alturaMin = "Altura Minima is number 1 - 40";
    } else if (!input.alturaMax) {
      error.alturaMax = "Altura Maxima is required";
    } else if (input.alturaMax < 41 || input.alturaMax > 100) {
      error.alturaMax = "Altura Maxima is number 41 - 100";
    } else if (!input.pesoMin) {
      error.pesoMin = "Peso Minimo is required";
    } else if (input.pesoMin < 1 || input.pesoMin > 40) {
      error.pesoMin = "Peso Minimo is number 1 - 40";
    } else if (!input.pesoMax) {
      error.pesoMax = "Peso Maximo is required";
    } else if (input.pesoMax < 41 || input.pesoMax > 100) {
      error.pesoMax = "Peso Maximo is number 41 - 100";
    } else if (!input.añosMin) {
      error.añosMin = "Años minimo de vida is required";
    } else if (input.añosMin < 1 || input.añosMin > 15) {
      error.añosMin = "Años minimo de vida is number 1 - 15";
    } else if (!input.añosMax) {
      error.añosMax = "Años Maximo de vida is required";
    } else if (input.añosMax < 16 || input.añosMax > 100) {
      error.añosMax = "Años Maximo de vida is number 16 - 100";
    }
    console.log("ESTO ES ERROR!!!!", error);
    return error;
  }
  //--------------------------------------------------------------------------------------------------------

  return (
    <div>
      <img
        className={styles.fondodeportada}
        src="https://i.pinimg.com/736x/20/79/97/207997fbb82ca8cff4b5d549a9164397.jpg"
        alt="Not found"
      />
      <div className={styles.divM}>
        <Link to="/home">
          <button className={styles.volver}>Go back</button>
        </Link>
        <br />
        <h1 className={styles.h1t}>Create </h1>
        <div className={styles.div2}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <input
                className={(error.name && styles.inputdanger) || styles.input}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter name"
              />
              {error.name && <p className={styles.danger}>{error.name}</p>}
            </div>

            <div>
              <div>
                <label>Maximum height: </label>
                <input
                  className={
                    (error.alturaMin && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="alturaMin"
                  value={input.alturaMin}
                  onChange={handleChange}
                  min="1"
                  max="40"
                  placeholder="Number from 1 to 49"
                />
                {error.alturaMin && (
                  <p className={styles.danger}>{error.alturaMin}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Minimun height: </label>
                <input
                  className={
                    (error.alturaMax && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="alturaMax"
                  value={input.alturaMax}
                  min="41"
                  max="100"
                  onChange={handleChange}
                  placeholder="Number from 41 to 100"
                />
                {error.alturaMax && (
                  <p className={styles.danger}>{error.alturaMax}</p>
                )}
              </div>
            </div>

            <div>
              <div>
                <label>Minimum weight: </label>
                <input
                  className={
                    (error.pesoMin && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="pesoMin"
                  value={input.pesoMin}
                  min="1"
                  max="40"
                  onChange={handleChange}
                  placeholder="Number from 1 to 40"
                />
                {error.pesoMin && (
                  <p className={styles.danger}>{error.pesoMin}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Maximum weight: </label>
                <input
                  className={
                    (error.pesoMax && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="pesoMax"
                  min="41"
                  max="100"
                  value={input.pesoMax}
                  onChange={handleChange}
                  placeholder="Number from 41 to 100"
                />
                {error.pesoMax && (
                  <p className={styles.danger}>{error.pesoMax}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Minimum years of life: </label>
                <input
                  className={
                    (error.añosMin && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="añosMin"
                  value={input.añosMin}
                  min="1"
                  max="15"
                  onChange={handleChange}
                  placeholder="Number from 1 to 15"
                />
                {error.añosMin && (
                  <p className={styles.danger}>{error.añosMin}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Maximum years of life: </label>
                <input
                  className={
                    (error.añosMax && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="añosMax"
                  value={input.añosMax}
                  min="16"
                  max="100"
                  onChange={handleChange}
                  placeholder="Number from 16 to 100 "
                />
                {error.añosMax && (
                  <p className={styles.danger}>{error.añosMax}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Image </label>
                <input
                  className={
                    (error.image && styles.inputdanger) || styles.input
                  }
                  onChange={handleChange}
                  type="url"
                  name="image"
                  value={input.image}
                  placeholder="http:www.imagen.com"
                />
              </div>
            </div>
            <div>
              <div>
                <label>Temperaments: </label>
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
                    {input.temperament.map(
                      (e) => (
                        console.log("ESTO ES E:", e),
                        (
                          <div key={e}>
                            <p>{e} </p>
                            <button value={e} onClick={(e) => handleDelete(e)}>
                              x
                            </button>{" "}
                          </div>
                        )
                      )
                    )}{" "}
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
    </div>
  );
}
