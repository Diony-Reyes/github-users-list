import React from "react";
import LoginForm from "../compoments/LoginForm";
import styles from "../styles/Login.module.scss";

export default function Login() {
  return (
    <div className={styles["container"]}>
      <div className={styles["login"]}>
        <LoginForm />
      </div>
    </div>
  );
}
