import React from "react";
import styles from "../../Styles/Input.module.css";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  onFocus,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        onBlur={onBlur}
        onFocus={onFocus}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
