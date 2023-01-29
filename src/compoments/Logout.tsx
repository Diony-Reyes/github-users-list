import React from "react";
import { Logout as LogooutIcon } from "../elements/Icon";
import styles from "../styles/Logout.module.scss";

export default function Logout() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      <div className={styles.text} onClick={() => logout()}>
        <LogooutIcon color="#757575" /> Cerrar sesión
      </div>
    </div>
  );
}
