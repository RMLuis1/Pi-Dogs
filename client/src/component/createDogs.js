import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDogs, getTemperament } from "../redux/actions";
import styles from "./createDogs.module.css";
import Swal from "sweetalert2";

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
    console.log("esto es e", e);
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
      return Swal.fire({
        title: "Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.name) {
      return Swal.fire({
        title: "Error!",
        text: "Name invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.alturaMin) {
      return Swal.fire({
        title: "Error!",
        text: "Altura Minima invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.alturaMax) {
      return Swal.fire({
        title: "Error!",
        text: "Altura Maxima invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.pesoMin) {
      return Swal.fire({
        title: "Error!",
        text: "Peso Minimo invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.pesoMax) {
      return Swal.fire({
        title: "Error!",
        text: "Peso Maximo invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.añosMin) {
      return Swal.fire({
        title: "Error!",
        text: "Años Minimo invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
    if (error.añosMax) {
      return Swal.fire({
        title: "Error!",
        text: "Años Maaximo invalidos",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else {
      dispatch(createDogs(input));
      Swal.fire({
        title: "Exito!",
        text: "Dog breed created successfully!",
        icon: "success",
        confirmButtonText: "ok",
      });
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
      error.alturaMin = "Minimum height is required";
    } else if (
      input.alturaMin < 1 ||
      input.alturaMin > 100 ||
      !Number(input.alturaMin)
    ) {
      error.alturaMin = "Minimum height is number 1";
    } else if (!input.alturaMax) {
      error.alturaMax = "Maximum height is required";
    } else if (
      input.alturaMax <= input.alturaMin ||
      input.alturaMax > 100 ||
      !Number(input.alturaMax)
    ) {
      error.alturaMax =
        "The maximum height must be greater than the minimum height and less than 100";
    } else if (!input.pesoMin) {
      error.pesoMin = "Minimum weight is required";
    } else if (input.pesoMin < 1 || input.pesoMin >100|| !Number(input.pesoMin)) {
      error.pesoMin = "Minimum weight is number 1";
    } else if (!input.pesoMax) {
      error.pesoMax = "Maximum weight is required";
    } else if (
      input.pesoMax <= input.pesoMin ||
      input.pesoMax > 100 ||
      !Number(input.pesoMax)
    ) {
      error.pesoMax =
        "The maximum weight must be greater than the minimum weight and less than 100";
    } else if (!input.añosMin) {
      error.añosMin = "Minimum years of life is required";
    } else if (input.añosMin < 1 || input.añosMax > 100 || !Number(input.añosMin)) {
      error.añosMin = "Minimum years of lifeis number 1";
    } else if (!input.añosMax) {
      error.añosMax = "Miximum years of life is required";
    } else if (
      input.añosMax <= input.añosMin ||
      input.añosMax > 100 ||
      !Number(input.añosMax)
    ) {
      error.añosMax =
        "The maximum years of life must be greater than the minimum years of life and less than 100";
    }
    console.log("ESTO ES ERROR!!!!", error);
    return error;
  }
  //--------------------------------------------------------------------------------------------------------

  return (
    <div>
      <div className={styles.divM}>
        <Link className={styles.aa} to="/home">
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
                <label>Minimum height: </label>
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
                  placeholder="Number greater or equal to 1"
                />
                {error.alturaMin && (
                  <p className={styles.danger}>{error.alturaMin}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Maximum height: </label>
                <input
                  className={
                    (error.alturaMax && styles.inputdanger) || styles.input
                  }
                  type="text"
                  name="alturaMax"
                  value={input.alturaMax}
                  min={input.alturaMin}
                  max="100"
                  onChange={handleChange}
                  placeholder="number greater than minimum height and less than 100"
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
                  placeholder="Number greater or equal to 1"
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
                  placeholder="Number greater than minimum weight and less than 100"
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
                  placeholder="Number greater or equal to 1"
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
                  placeholder="Number greater than minimum yearss of life and less than 100"
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
                    {input.temperament.map((e) => (
                      <div key={e}>
                        <p>{e} </p>
                        <button value={e} onClick={(e) => handleDelete(e)}>
                          x
                        </button>{" "}
                      </div>
                    ))}{" "}
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
