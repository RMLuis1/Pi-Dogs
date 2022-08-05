import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingPage.module.css";
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div>
        <title className={styles.title}>Welcome!</title>
        {/* <h1></h1> */}
        <div className={styles.container}>
          <img
          className={styles.img}
            src="https://i.pinimg.com/originals/d2/99/40/d2994005233783287041f6b90980546b.gif"
            alt=""
          />
          <NavLink to="/home">
            {" "}
            <button className={styles.button}>Get in</button>
          </NavLink>
          <section className={styles.title2}>
            <a
              className={styles.a}
              href="https://www.linkedin.com/in/ricardo-martin-luis07/"
            >
              <FaLinkedin />
            </a>
            <a className={styles.a2} href="https://github.com/RMLuis1">
              <FaGithub />
            </a>
            <p>Copyright © 2022 Ricardo-Martin-Luis.</p>
            <p>All rights reserved</p>
          </section>
        </div>
      </div>
    </div>
  );
}
