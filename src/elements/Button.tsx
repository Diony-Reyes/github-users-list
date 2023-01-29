import React from "react";
import styles from "../styles/Elements.module.scss";

export default function Button({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={[styles.button, className].join(" ")} {...props}>
      {props.children}
    </button>
  );
}
