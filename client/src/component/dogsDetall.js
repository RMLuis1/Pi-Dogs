import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogID } from "../redux/actions";

export default function Dogs() {
  const dispatch = useDispatch();
  const { id } = useParams;
  const dogsDetall = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogID(id));
  }, [dispatch]);

  return (
    <div>
      <NavLink to="/home">
        <button>volver</button>
      </NavLink>
      <div>
        {dogsDetall ? (
          <div>
            <img
              width={150}
              height={100}
              src={dogsDetall.image}
              alt="Image no Found"
            />
            <h1>{dogsDetall.name}</h1>
            <p>
              <strong>Altura: </strong> {dogsDetall.altura}{" "}
            </p>
            <p>
              <strong>Peso: </strong> {dogsDetall.peso}{" "}
            </p>
            <p>
              <strong>Años De Vida: </strong> {dogsDetall.año_de_vida}{" "}
            </p>
            <p>
              <strong>Temperamento: </strong>
              {dogsDetall.temperament}
            </p>
          </div>
        ) : (
          "No found"
        )}
      </div>
    </div>
  );
}
