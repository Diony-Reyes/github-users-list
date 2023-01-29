import React from "react";
import styles from "../styles/Elements.module.scss";

export default function Input({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return <input className={[styles.input, className].join(" ")} {...props} />;
}
