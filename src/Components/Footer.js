import React from "react";
import styles from "../Styles/Footer.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs-footer.svg";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Dogs />
      <p>Dogs. Direitos reservados</p>
    </div>
  );
};

export default Footer;
