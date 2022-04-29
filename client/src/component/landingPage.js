import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingPage.module.css"

export default function LandingPage() {
  return (
    <div>
        <title className={styles.title} >Welcome!</title>
      <h1>Soy Landing Page</h1>
      <NavLink to="/home" > <button className={styles.button} >Get in</button></NavLink> 
    </div>
  );
}
