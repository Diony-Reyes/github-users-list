import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "../styles/Profile.module.scss";
import Logout from "./Logout";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as User;

  if (!user) {
    window.location.href = "/login";
  }

  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
    }

    return () => {};
  }, []);

  return (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-contained" className={styles.popover}>
          <Logout />
        </Popover>
      }
    >
      <div className={styles.container}>
        <div className={styles.initial}>{user?.name?.charAt(0)}</div>
        <div className={styles.email}>{user?.email}</div>
      </div>
    </OverlayTrigger>
  );
}
