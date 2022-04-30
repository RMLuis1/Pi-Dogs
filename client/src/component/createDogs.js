import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDogs, getTemperament } from "../redux/actions";
import styles from "./createDogs.module.css";

export default function CreateDogs() {
  const dispatch = useDispatch();
  const dogsCreate = useSelector((state) => state.dogs);
  const allTemperament = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    altura: "",
    peso: "",
    años_de_vida: "",
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
      !input.altura ||
      !input.años_de_vida ||
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
        altura: "",
        peso: "",
        años_de_vida: "",
        image: "",
        temperament: [],
      });
    }
  }
  //---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);
  useEffect(() => {
    dispatch(createDogs(input));
  }, [dispatch]);

  //-----------------------------------------------Validaciones-------------------------------------------
  //!Validaciones
  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "Name is required";
    } else if (!/^[A-Z]+$/i.test(input.name)) {
      error.name = "Name is invalid";
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
            <labe>Name </labe>
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
              <labe>Altura </labe>
              <input />
            </div>
          </div>
          <div>
            <div>
              <labe>Peso </labe>
              <input />
            </div>
          </div>
          <div>
            <div>
              <labe>Años de vida </labe>
              <input />
            </div>
          </div>
          <div>
            <div>
              <labe>Image </labe>
              <input
                className={
                  (inputError.image && styles.inputdanger) || styles.input
                }
              />
            </div>
          </div>
          <div>
            <div>
              <labe>Temperamentos </labe>
              <select className={styles.input} onChange={(e)=> handleTemperament(e)}>
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
            Crete Activity
          </button>
        </form>
      </div>
    </div>
  );
}
