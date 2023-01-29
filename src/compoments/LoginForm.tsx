import React from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import databases from "../database.json";
import styles from "../styles/Login.module.scss";

export default function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = databases.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } else {
      setError("Usuario o contraseña incorrecta");
    }
  };

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      window.location.href = "/";
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <img className={styles["login__img"]} src="/imgs/logo.png" alt="logo" />

      <div className={styles["login__form"]}>
        {error && <p className={styles["login__error"]}>{error}</p>}

        <Input
          className={styles["login__input"]}
          name="email"
          type="email"
          placeholder="Usuario"
          required
        />

        <Input
          className={styles["login__input"]}
          type="password"
          name="password"
          placeholder="Contraseña"
          minLength={8}
          required
        />

        <Button className={styles["login__button"]} type="submit">
          Acceder
        </Button>
      </div>
    </form>
  );
}
