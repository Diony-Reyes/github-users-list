import React from "react";
import { Link, Outlet } from "react-router-dom";
import Profile from "./Profile";
import styles from "../styles/Layout.module.scss";

export default function Layout() {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles["logo__nav"]}>
          <img
            className={styles.img}
            src={process.env.PUBLIC_URL + "/imgs/logo.png"}
            alt="logo"
          />

          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
          </ul>
        </div>

        <Profile />
      </nav>

      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}
