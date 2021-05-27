import React from "react";
import styles from "../../Styles/FeedPhotosItem.module.css";

const FeedPhotosItem = ({ photo }) => {
  return (
    <li className={styles.photo}>
      <img src={photo.src} alt={photo.alt} />
      <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
