import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <div >
        <img
        className={styles.fondodeportada}
        src="https://www.publicdomainpictures.net/pictures/400000/nahled/hunde-vintage-kunst-alt-1619901154yXZ.jpg"
        alt="Not found"
      />

        <title className={styles.title}>Welcome!</title>
        <h1></h1>
        <div className={styles.container}>
          <NavLink to="/home">
            {" "}
            <button className={styles.button}>Get in</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
